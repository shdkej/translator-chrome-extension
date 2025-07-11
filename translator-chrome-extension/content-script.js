function extractTitleAndBody() {
  // 제목은 input#title의 value에서 추출
  const title = document.querySelector("input#title")?.value || "";

  // CKEditor 인스턴스가 있으면 getData() 사용
  let body = "";
  const textarea = document.getElementById("FCKeditor1");
  if (textarea) {
    if (textarea) {
      const html = textarea.value;
      const doc = document.createElement("div");
      doc.innerHTML = html;
      body = doc.innerText || doc.textContent || "";
      body = body.trim();
    } else {
      // fallback: 기존 방식
      console.log("fallback");
      body =
        document.querySelector(".wt-forms.writing-editor .wt-forms-content")
          ?.textContent || "";
    }
  }
  if (body) {
    console.log("[content-script] 추출된 기사 본문:", body);
  }
  return { title, body };
}

function highlightFeedbackInBody(feedback) {
  const bodyDiv = document.querySelector(
    ".wt-forms.writing-editor .wt-forms-content"
  );
  if (!bodyDiv) return;
  // 피드백 단어별로 빠른 lookup을 위해 맵 생성
  const feedbackMap = {};
  feedback.forEach((fb) => {
    feedbackMap[fb.text] = fb.suggestion;
  });
  // 텍스트 노드만 변환 (중첩 방지, 한 번에 모든 단어 처리)
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.nodeValue;
      // 피드백 단어 위치 모두 수집
      let matches = [];
      Object.keys(feedbackMap).forEach((word) => {
        const re = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
        let m;
        while ((m = re.exec(text)) !== null) {
          matches.push({ start: m.index, end: m.index + word.length, word });
        }
      });
      if (matches.length === 0) return;
      // 겹침 방지: 시작순 정렬, 겹치는 부분은 앞의 것만
      matches.sort((a, b) => a.start - b.start);
      let filtered = [];
      let lastEnd = 0;
      for (let i = 0; i < matches.length; i++) {
        if (matches[i].start >= lastEnd) {
          filtered.push(matches[i]);
          lastEnd = matches[i].end;
        }
      }
      // 새 fragment 생성
      const frag = document.createDocumentFragment();
      let curr = 0;
      filtered.forEach(({ start, end, word }) => {
        if (curr < start) {
          frag.appendChild(document.createTextNode(text.slice(curr, start)));
        }
        const span = document.createElement("span");
        span.className = "highlight";
        span.textContent = text.slice(start, end);
        if (feedbackMap[word]) span.title = `제안: ${feedbackMap[word]}`;
        frag.appendChild(span);
        curr = end;
      });
      if (curr < text.length) {
        frag.appendChild(document.createTextNode(text.slice(curr)));
      }
      node.parentNode.replaceChild(frag, node);
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      !node.classList.contains("highlight")
    ) {
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        walk(node.childNodes[i]);
      }
    }
  }
  walk(bodyDiv);
}

if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = { extractTitleAndBody, highlightFeedbackInBody };
}

// 메시지 리스너: popup 등에서 HIGHLIGHT_FEEDBACK 메시지를 받으면 하이라이트 실행
if (
  typeof chrome !== "undefined" &&
  chrome.runtime &&
  chrome.runtime.onMessage
) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (
      message.type === "HIGHLIGHT_FEEDBACK" &&
      Array.isArray(message.feedback)
    ) {
      highlightFeedbackInBody(message.feedback);
    }
    if (message.type === "GET_ARTICLE_CONTENT") {
      const { title, body } = extractTitleAndBody();
      sendResponse({ title, body });
      return true; // 비동기 응답 명시
    }
  });
}

// 부모 프레임에서 GET_ARTICLE_CONTENT 메시지를 받으면 iframe에 요청을 relay
if (window.self === window.top) {
  if (
    typeof chrome !== "undefined" &&
    chrome.runtime &&
    chrome.runtime.onMessage
  ) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "GET_ARTICLE_CONTENT") {
        const iframe = document.getElementById("newsWritePreview");
        if (iframe && iframe.contentWindow) {
          let responded = false; // 중복 방지 플래그
          function handleMessage(event) {
            if (event.data.type === "ARTICLE_BODY" && !responded) {
              responded = true;
              window.removeEventListener("message", handleMessage);
              sendResponse({ title: event.data.title, body: event.data.body });
            }
          }
          window.addEventListener("message", handleMessage);

          // 이미 로드된 경우와 아닌 경우 모두 처리
          if (
            iframe.contentDocument &&
            iframe.contentDocument.readyState === "complete"
          ) {
            iframe.contentWindow.postMessage(
              { type: "REQUEST_ARTICLE_BODY" },
              "*"
            );
          } else {
            iframe.addEventListener("load", function onLoad() {
              iframe.removeEventListener("load", onLoad);
              iframe.contentWindow.postMessage(
                { type: "REQUEST_ARTICLE_BODY" },
                "*"
              );
            });
          }
          return true; // 비동기 응답
        }
      }
    });
  }
}

// iframe 내부에서 REQUEST_ARTICLE_BODY 메시지를 받으면 본문 추출 후 부모로 전달
if (window.self !== window.top) {
  window.addEventListener("message", (event) => {
    if (event.data.type === "REQUEST_ARTICLE_BODY") {
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        const { title, body } = extractTitleAndBody();
        window.parent.postMessage({ type: "ARTICLE_BODY", title, body }, "*");
      } else {
        document.addEventListener(
          "DOMContentLoaded",
          () => {
            const { title, body } = extractTitleAndBody();
            window.parent.postMessage(
              { type: "ARTICLE_BODY", title, body },
              "*"
            );
          },
          { once: true }
        );
      }
    }
  });
  // 기존: DOMContentLoaded 시 자동 추출 및 전달 (필요시 유지)
}
