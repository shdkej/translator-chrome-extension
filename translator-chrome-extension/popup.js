const FULL_PROMPT = `당신은 한국어 기사 교정 전문가입니다.
AI가 기사의 목적/스타일에 맞게 자연스럽게 한국어 기사로 구성할 수 있도록 안내합니다.

**기사 작성 시 주의할 점**
- 제목에는 "일본" 대신 '日'을 사용
- 문장 구조는 한국 시점에서 써야 함 (예: "일본 현지에서", "일본 정부는" 등)

■ 기사 선정 및 rewrite 관련 지침
1) 편파적 입장 아닌 중립적 입장에서 작성하는 것이 중요. 자극적인 워딩 등은 지양.
주요 주제: 한일 60주년, 협력, 한국 우호 발언, 중국 일본 수산물 수입 재개, 일본 정재계 방한, 사도광산 등  (아래 예시)
1.日 이시바 총리 "어떤 정권 들어서도 올해는 한일 수교 60주년"… 협력 중요성 거듭 강조 -
2.중국, "日 처리수 2차 검사도 이상 없어" 지난해 이어 연이어 문제 없다는 조사 결과... 수산물 수입 재개 가능성 커져

2) 한국어 맞춤법 확인

3) 한국 기사의 톤으로 작성되도록 해야함

4) 일본 관련 기사임을 알리기 위해 제목 첫부분에 日 한자 활용

[풍성한 번역을 위한 추가 지침]
※ 기사 스타일을 살리되, 정보가 부족해지지 않게 주의해.
※ 반드시 원문 분량에 맞춰 충분히 길고 상세하게 번역해. 정보량이 원문과 비슷해야 하며, 절대 요약하지 마.
※ 불필요한 반복이나 군더더기는 줄이되, 원문에 있는 모든 핵심 정보(수치, 인용, 맥락, 배경 등)는 빠짐없이 포함해.
※ 일본식 영어(예: 카프셀토이, 콘비니, 아루바이토 등)는 반드시 한국에서 실제로 쓰는 자연스러운 표현(예: 캡슐토이, 편의점, 아르바이트 등)으로 번역해. 일본식 발음 표기는 절대 사용하지 마.
※ 의미가 모호한 일본식 외래어는 한국에서 통용되는 단어로 바꿔 써.
※ 예시: 일본어 원문 'カプセルトイ' → 번역 '캡슐토이', 'コンビニ' → '편의점', 'アルバイト' → '아르바이트'

※ 원문 내용을 너무 요약하지 말고, 핵심 정보(수치, 인용, 맥락, 배경 등)는 빠짐없이 포함해줘.
※ 경제,사회 기사에서 국가간을 표현 구분할때 중간에 · 넣어줘. 예를들어 기사 내용 중 '미국과 중국의 합의를 도출했다'의 경우 '미·중 합의도출' 처럼 이런식으로 중간에 · 표시 추가

**중요: 기사 URL의 도메인(예: nhk.or.jp, jiji.com, nikkei.com 등)을 보고 실제 신문사/매체명을 정확하게 표기해라.**
- 예시:
- nhk.or.jp → NHK
- jiji.com → 지지통신
- nikkei.com → 니혼게이자이신문
- mainichi.jp → 마이니치신문
- news.yahoo.co.jp → 야후재팬
- yomiuri.co.jp → 요미우리신문
- asahi.com → 아사히신문
- 기사 내 'NHK 등 일본 현지 매체가 보도했다'라는 문구는, 실제 기사 URL의 신문사명으로 바꿔서 넣어라.
- 여러 기사라면, 각 기사에 맞는 신문사명을 자연스럽게 기사 내에 녹여라.
- 참고: 반드시 제공된 기사 링크만 '참고: 링크' 또는 '출처' 영역에 사용해줘. 임의의 다른 링크를 넣지 마.

**아래 사항을 반드시 지켜라:**
- 기사에 없는 내용, AI의 추정, 상상, 일반적 배경 설명, 맥락 보강, 일반화, 추가 설명 등은 절대 하지 마라.
- 반드시 기사 원문에 있는 내용만 충실히 번역하라.
- 단순 번역이지만, 한국어 기사처럼 자연스럽고 매끄럽게 읽히도록 해라.
- 만약 기사 정보가 없다면 기사 정보가 없다고 문자열을 반환해라.

** 반드시 지켜야 하는 규칙 Strict Rule! **
※ 일본 인명(한자)을 일본식 발음 기준의 한국어 표기(예: 中居正広의 경우 나카이 마사히로, 石破茂의 경우, 이시바 시게루) 로 표기해줘
※ 제목과 본문에 일본 기사에 등장하는 고유명사(예: 시설명, 작품명, 건축물 등) 를 한국어 뜻(일본어 원문) (예: 太陽の塔 → 태양의 탑(太陽의 탑)) 형식으로 표기해줘. 위치는 필요없어
`;

console.log("popup.js loaded");

function fetchArticleContentFromContentScript(callback) {
  console.log("call send message");
  if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage({ type: "GET_ARTICLE_CONTENT" }, (res) => {
      console.log("response");
      if (res && res.title && res.body) {
        console.log("[AI 교정] 읽은 기사 제목:", res.title);
        console.log("[AI 교정] 읽은 기사 본문:", res.body);
        callback(res.title, res.body);
      } else {
        console.warn("[AI 교정] 기사 본문을 가져오지 못했습니다.");
      }
    });
  }
}

function fillTextareaWithArticle(title, body) {
  const textarea = document.querySelector("textarea");
  if (textarea) {
    textarea.value = `${title}\n${body}`;
  }
}

function showArticleContent(title, body) {
  const contentDiv = document.querySelector("#article-content");
  if (contentDiv) {
    contentDiv.textContent = `${title} ${body}`;
  }
}

function setCorrectionResult(text) {
  const resultDiv = document.getElementById("correction-result");
  if (resultDiv) resultDiv.textContent = text;
}

async function fetchOpenAICorrection(apiKey, prompt, userInput) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: userInput },
      ],
    }),
  });
  console.log({ userInput });
  if (!res.ok) throw new Error("API Error");
  const json = await res.json();
  return json.choices?.[0]?.message?.content || "";
}

function getApiKey(cb) {
  chrome.storage.local.get("openaiApiKey", (data) => {
    cb(data.openaiApiKey);
  });
}

// 하이라이트 메시지 전송 함수
function sendHighlightToContentScript(feedback) {
  if (!chrome.tabs || !chrome.tabs.query || !chrome.tabs.sendMessage) return;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0]) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          type: "HIGHLIGHT_FEEDBACK",
          feedback,
        },
        (response) => {
          if (chrome.runtime.lastError) {
            console.warn(
              "[익스텐션] content script 연결 실패:",
              chrome.runtime.lastError.message
            );
          }
        }
      );
    }
  });
}

function handleCorrectionButton(options) {
  const button = document.getElementById("correction-btn");
  console.log(" button exist test");
  if (!button) return;
  if (options.openAICall) {
    button.onclick = async () => {
      console.log("[AI 교정] 버튼 클릭됨");
      const value = getExtraInputValue();
      setCorrectionResult("로딩 중");
      console.log("[AI 교정] openAICall 시작");
      try {
        const result = await options.openAICall(value);
        console.log("[AI 교정] openAICall 성공", result);
        setCorrectionResult(result);
        try {
          const parsed = JSON.parse(result);
          if (Array.isArray(parsed.highlights)) {
            sendHighlightToContentScript(parsed.highlights);
          }
        } catch {}
      } catch (e) {
        console.log("[AI 교정] openAICall 실패", e);
        setCorrectionResult("[AI 교정] openAICall 실패");
      }
    };
  } else if (options.onCorrection) {
    button.onclick = options.onCorrection;
  } else {
    button.onclick = async () => {
      console.log("[AI 교정] 버튼 클릭됨");
      setCorrectionResult("[AI 교정] 버튼 클릭됨");
      fetchArticleContentFromContentScript((title, body) => {
        fillTextareaWithArticle(title, body);
        getApiKey(async (apiKey) => {
          if (!apiKey) {
            console.log("[AI 교정] API Key 없음");
            return setCorrectionResult("[AI 교정] API Key 없음");
          }
          try {
            const value = getExtraInputValue();
            console.log("[AI 교정] fetchOpenAICorrection 시작");
            const result = await fetchOpenAICorrection(
              apiKey,
              FULL_PROMPT,
              value
            );
            console.log("[AI 교정] fetchOpenAICorrection 성공", result);
            setCorrectionResult(result);
            try {
              const parsed = JSON.parse(result);
              if (Array.isArray(parsed.highlights)) {
                sendHighlightToContentScript(parsed.highlights);
              }
            } catch {}
          } catch (e) {
            console.log("[AI 교정] fetchOpenAICorrection 실패", e);
            setCorrectionResult("[AI 교정] fetchOpenAICorrection 실패");
          }
        });
      });
    };
  }
}

function renderPopup(options = {}) {
  const root = document.getElementById("popup-root");
  root.innerHTML = `
    <div>
      <textarea></textarea>
      <button id="correction-btn">AI 교정 요청</button>
      <div id="correction-result"></div>
      <div id="article-content"></div>
    </div>
  `;
  fetchArticleContentFromContentScript((title, body) => {
    showArticleContent(title, body);
    fillTextareaWithArticle(title, body);
  });
  handleCorrectionButton(options);
}

function getExtraInputValue() {
  const textarea = document.querySelector("textarea");
  return textarea ? textarea.value : "";
}

// CommonJS export만 허용 (ES module export 제거)
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = {
    renderPopup,
    getExtraInputValue,
    fetchArticleContentFromContentScript,
    fillTextareaWithArticle,
    showArticleContent,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("popup-root");
  if (root) renderPopup();
});
