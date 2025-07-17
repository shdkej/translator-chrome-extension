function injectHighlightStyleToIframe(iframe) {
  if (!iframe || !iframe.contentDocument) return;
  const styleId = "ai-highlight-style";
  if (iframe.contentDocument.getElementById(styleId)) return; // 이미 있으면 중복 삽입 방지
  const style = iframe.contentDocument.createElement("style");
  style.id = styleId;
  style.textContent = `
    .highlight {
      background: yellow !important;
      color: #222 !important;
      border-radius: 2px;
      padding: 0 2px;
      box-shadow: 0 0 2px #ff0;
    }
  `;
  iframe.contentDocument.head.appendChild(style);
}

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

function splitMarkdownByDashes(markdown) {
  // --- 또는 빈 줄로 robust하게 분리
  return markdown
    .split(/(?:^|\n)---+\n/g)
    .map((block) => block.trim())
    .filter((block) => block.length > 0);
}

function highlightCkeditorBody(feedback) {
  if (!Array.isArray(feedback) || feedback.length === 0) return false;
  const iframe = document.querySelector(
    'iframe.cke_wysiwyg_frame[title*="FCKeditor1"]'
  );
  if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
    injectHighlightStyleToIframe(iframe);
    let html = iframe.contentDocument.body.innerHTML;
    feedback.forEach((fb) => {
      const re = new RegExp(
        fb.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "g"
      );
      html = html.replace(
        re,
        `<span class="highlight" title="제안: ${fb.suggestion || ""}">$&</span>`
      );
    });
    iframe.contentDocument.body.innerHTML = html;
    return true;
  }
  return false;
}

function observeAndHighlightCkeditorBody(feedback) {
  if (highlightCkeditorBody(feedback)) return;
  const observer = new MutationObserver(() => {
    const found = highlightCkeditorBody(feedback);
    if (found) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function highlightFeedbackInBody(feedback) {
  observeAndHighlightCkeditorBody(feedback);
}

function waitForEditorAndSetBody(body, tries = 20) {
  // 1. ekeditor(커스텀 에디터) 인스턴스가 있으면 공식 API로 반영
  if (window.ekeditor && typeof window.ekeditor.setHtml === "function") {
    console.log("[waitForEditorAndSetBody] ekeditor 사용");
    window.ekeditor.setHtml(body);
    return;
  }
  // 2. CKEditor 인스턴스가 있으면 공식 API로 반영 + iframe 내부도 직접 할당
  if (
    window.CKEDITOR &&
    window.CKEDITOR.instances &&
    window.CKEDITOR.instances.FCKeditor1
  ) {
    console.log("[waitForEditorAndSetBody] CKEDITOR 사용");
    window.CKEDITOR.instances.FCKeditor1.setData(body);
    // 혹시 setData만으로 안 바뀌면 iframe 내부도 직접 할당
    const iframe = document.querySelector("iframe.cke_wysiwyg_frame");
    if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
      iframe.contentDocument.body.innerHTML = body;
    }
    return;
  }
  // 3. 만약 이 프레임이 에디터의 진짜 본문(iframe 내부)라면
  if (
    document.body &&
    document.body.classList.contains("cke_editable") &&
    document.body.isContentEditable
  ) {
    console.log("[waitForEditorAndSetBody] 직접 body.innerHTML 할당");
    document.body.innerHTML = body;
    return;
  }
  // 4. 재시도
  if (tries > 0) {
    setTimeout(() => waitForEditorAndSetBody(body, tries - 1), 500);
  } else {
    // fallback: textarea
    const textarea = document.getElementById("FCKeditor1");
    if (textarea) {
      console.log("[waitForEditorAndSetBody] fallback textarea");
      textarea.value = body;
    }
  }
}

function injectAppliedCorrectionStyleToIframe(iframe) {
  if (!iframe || !iframe.contentDocument) return;
  const styleId = "ai-applied-correction-style";
  if (iframe.contentDocument.getElementById(styleId)) return;
  const style = iframe.contentDocument.createElement("style");
  style.id = styleId;
  style.textContent = `
    .applied-correction {
      background: #b6fcb6 !important;
      color: #155724 !important;
      border-radius: 2px;
      padding: 0 2px;
      box-shadow: 0 0 2px #6f6;
      font-weight: bold;
    }
  `;
  iframe.contentDocument.head.appendChild(style);
}

function setCkeditorBodyFromParentReplace(corrections) {
  if (!Array.isArray(corrections) || corrections.length === 0) return false;
  const iframe = document.querySelector(
    'iframe.cke_wysiwyg_frame[title*="FCKeditor1"]'
  );
  if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
    injectHighlightStyleToIframe(iframe);
    injectAppliedCorrectionStyleToIframe(iframe);
    let html = iframe.contentDocument.body.innerHTML;
    corrections.forEach(({ before, after }) => {
      const highlightedAfter = `<span class="applied-correction">${after}</span>`;
      html = html.split(before).join(highlightedAfter);
    });
    iframe.contentDocument.body.innerHTML = html;
    return true;
  }
  return false;
}

function observeAndReplaceCkeditorBody(corrections) {
  // 이미 존재하면 바로 처리
  if (setCkeditorBodyFromParentReplace(corrections)) return;
  // 아니면 MutationObserver로 감시
  const observer = new MutationObserver(() => {
    const found = setCkeditorBodyFromParentReplace(corrections);
    if (found) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function setArticleBody(corrections) {
  observeAndReplaceCkeditorBody(corrections);
}

function setArticleTitle(title) {
  const input = document.querySelector("input#title");
  if (input) {
    input.value = title;
  }
}

function handleApplyCorrection(payload) {
  // payload가 배열이면 그대로, 아니면 빈 배열
  console.log("1. payload", payload);
  setArticleBody(payload.body);
}

function observeAndExtractTitleAndBody(callback) {
  function tryExtract() {
    const titleInput = document.querySelector("input#title");
    const textarea = document.getElementById("FCKeditor1");
    if (titleInput && textarea) {
      callback({
        title: titleInput.value,
        body: textarea.value,
      });
      return true;
    }
    return false;
  }
  // 즉시 한 번 시도
  if (tryExtract()) return;
  // 아니면 MutationObserver로 감시
  const observer = new MutationObserver(() => {
    if (tryExtract()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function removeHighlightsFromCkeditor() {
  const iframe = document.querySelector(
    'iframe.cke_wysiwyg_frame[title*="FCKeditor1"]'
  );
  if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
    const doc = iframe.contentDocument;
    // 모든 .highlight, .applied-correction span을 평문으로 교체
    [
      ...doc.querySelectorAll("span.highlight, span.applied-correction"),
    ].forEach((span) => {
      const text = span.textContent;
      const parent = span.parentNode;
      parent.replaceChild(doc.createTextNode(text), span);
      parent.normalize(); // 인접 텍스트 노드 병합
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.querySelector("button.btn.btn-save");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      removeHighlightsFromCkeditor();
    });
  }
});

const messageHandlers = {
  HIGHLIGHT_FEEDBACK: (message, sendResponse) => {
    highlightFeedbackInBody(message.feedback);
  },
  GET_ARTICLE_CONTENT: (message, sendResponse) => {
    observeAndExtractTitleAndBody(({ title, body }) => {
      sendResponse({ title, body });
    });
    return true;
  },
  APPLY_CORRECTION: (message, sendResponse) => {
    handleApplyCorrection(message.payload);
    sendResponse && sendResponse({ ok: true });
  },
};

if (
  typeof chrome !== "undefined" &&
  chrome.runtime &&
  chrome.runtime.onMessage
) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message && message.type && messageHandlers[message.type]) {
      return messageHandlers[message.type](message, sendResponse);
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
