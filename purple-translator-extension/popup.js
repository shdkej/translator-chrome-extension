// 마크다운 줄바꿈 옵션 활성화
window.marked.setOptions({
  breaks: true,
  gfm: true,
});

const FULL_PROMPT = `
**기사 작성 시 주의할 점**
- 제목에는 "일본" 대신 '日'을 사용
- 한일 이라는 단어는 유지
- 문장 구조는 한국 시점에서 써야 함 (예: "일본 현지에서", "일본 정부는" 등)

■ 기사 선정 및 rewrite 관련 지침
1) 편파적 입장 아닌 중립적 입장에서 작성하는 것이 중요. 자극적인 워딩 등은 지양.
주요 주제: 한일 60주년, 협력, 한국 우호 발언, 중국 일본 수산물 수입 재개, 일본 정재계 방한, 사도광산 등  (아래 예시)
1.日 이시바 총리 "어떤 정권 들어서도 올해는 한일 수교 60주년"… 협력 중요성 거듭 강조 -
2.중국, "日 처리수 2차 검사도 이상 없어" 지난해 이어 연이어 문제 없다는 조사 결과... 수산물 수입 재개 가능성 커져

2) 한국어 맞춤법 확인

3) 한국 기사의 톤으로 작성되도록 해야함

4) 일본 관련 기사임을 알리기 위해 제목 첫부분에 日 한자 활용

5) 일본어스러운 표현 수정

6) 불필요한 표현 제거

7) 드라마& 애니 작품 : <> / 노래 : '' 사용, 사진 출처 표기 및 시대 표기, 지칭 등
- '마녀 배달부 키키', '하울의 움직이는 성' -> <마녀 배달부 키키>, <하울의 움직이는 성>
- (좌) (우) -> (왼쪽) (오른쪽)
- (사진촬영 청년기자 ooo) -> (사진 출처: ooo 청년기자)
- 나 -> 필자
- 헤이안 시대 -> 헤이안시대(794~1185)

🧠 AI용 일본 기사 첨삭 및 교정 가이드라인
1. ✍️ 문장 어투 및 표현 톤
항목        규칙
어투        신조어, 은어, 구어체는 지양하고, 기사체에 맞는 표준적이고 정제된 표현으로 바꾼다.
감정 표현        감정은 단순한 감탄이나 형용사보다 행동 + 감정 원인 구조로 자연스럽게 설명한다.
문장 톤        지나치게 캐주얼하거나 유행어 중심이 되지 않도록 보편적이고 서정적인 문장을 유지한다.

2. ✂️ 불필요한 요소 제거 및 구조 최적화
항목        규칙
중복 제거        의미가 중복되거나 반복되는 단어는 한 번만 사용한다. (예: ‘나가노’ vs. ‘나가노현’)
구문 다듬기        “~을 칭하는 말로”, “~할 즈음부터” 같은 어색한 표현은 자연스러운 서술문으로 정리한다.
주어 명확화        문장의 주어는 지명, 제도 등 공식 표현을 사용해 처음부터 명확히 한다.
문장 흐름        시간·공간 전환은 간결한 연결어(예: “가까워지면서”, “지나면서”)로 처리한다.
정보 배치        배경 설명 → 핵심 정보 순서로 배치해 독자의 이해를 돕는다.

3. 🈶 외래어 표기 (일본어 고유명사 포함)
기본 원칙: 외래어 표기는 국립국어원 외래어 표기법을 따르고, 표기 일관성을 유지한다.

일본어 음절        표기 규칙        예시
つ(tsu)        쓰        쓰루가시마, 마쓰리, 쓰시마
し(shi)        시        시즈오카, 시부야
ち(chi)        치        다치카와, 치바
た(ta)        다        다카야마, 다카마쓰
け(ke)        게        게이오선, 게이센
じょ(jo)        죠        기치죠지, 후쿠죠카
고유명사 표기        표기한 방식은 기사 전체에서 항상 동일하게 유지한다. (예: ‘지쿠린’으로 정했으면 끝까지 유지)        
표기 기준 우선순위        ① 외래어 표기법 → ② 공식 지자체/기관 사이트 → ③ 위키백과 또는 관용 표기        

4. 🇰🇷 한글 맞춤법 및 자연스러운 표현
항목        규칙
맞춤법        표준어와 띄어쓰기, 된소리 표기를 준수한다. (예: 망설임, 쌉싸름, 젤라토, 핼러윈)
명사형        색상 등은 형용사 활용형으로 자연스럽게 사용 (예: 빨강색 ❌ → 빨간색 ✅)
1인칭 표현        기사에서는 ‘나’ 대신 **‘필자’**를 사용한다.

5. 🖼️ 형식 및 표기 통일
항목        규칙
🎬 드라마/애니 제목        '작품명' → <작품명>으로 표기 (항상 꺾쇠 괄호 사용)
🎵 노래 제목        '노래 제목' 형식으로 표기 (따옴표 사용 유지)
🖼️ 방향 표기        (좌), (우) → (왼쪽), (오른쪽)으로 표기
📸 사진 설명        (사진촬영 ~) → (사진 출처: ~) 형식으로 통일
📜 역사 시대        ‘시대명 + 시대’ + 연도 표기(예: 헤이안시대(794~1185)) 형태로 작성

[풍성한 번역을 위한 추가 지침]
※ 기사 스타일을 살리되, 정보가 부족해지지 않게 주의해.
※ 반드시 원문 분량에 맞춰 충분히 길고 상세하게 번역해. 정보량이 원문과 비슷해야 하며, 절대 요약하지 마.
※ 불필요한 반복이나 군더더기는 줄이되, 원문에 있는 모든 핵심 정보(수치, 인용, 맥락, 배경 등)는 빠짐없이 포함해.
※ 일본식 영어(예: 카프셀토이, 콘비니, 아루바이토 등)는 반드시 한국에서 실제로 쓰는 자연스러운 표현(예: 캡슐토이, 편의점, 아르바이트 등)으로 번역해. 일본식 발음 표기는 절대 사용하지 마.
※ 의미가 모호한 일본식 외래어는 한국에서 통용되는 단어로 바꿔 써.
※ 예시: 일본어 원문 'カプセルトイ' → 번역 '캡슐토이', 'コンビニ' → '편의점', 'アルバイト' → '아르바이트'
※ 경제,사회 기사에서 국가간을 표현 구분할때 중간에 · 넣어줘. 예를들어 기사 내용 중 '미국과 중국의 합의를 도출했다'의 경우 '미·중 합의도출' 처럼 이런식으로 중간에 · 표시 추가

**아래 사항을 반드시 지켜라:**
- 기사에 없는 내용, AI의 추정, 상상, 일반적 배경 설명, 맥락 보강, 일반화, 추가 설명 등은 절대 하지 마라.
- 반드시 기사 원문에 있는 내용만 충실히 번역하라.
- 단순 번역이지만, 한국어 기사처럼 자연스럽고 매끄럽게 읽히도록 해라.
- 만약 기사 정보가 없다면 기사 정보가 없다고 문자열을 반환해라.

** 반드시 지켜야 하는 규칙 Strict Rule! **
※ 일본 인명(한자)을 일본식 발음 기준의 한국어 표기(예: 中居正広의 경우 나카이 마사히로, 石破茂의 경우, 이시바 시게루) 로 표기해줘
※ 제목과 본문에 일본 기사에 등장하는 고유명사(예: 시설명, 작품명, 건축물 등) 를 한국어 뜻(일본어 원문) (예: 太陽の塔 → 태양의 탑(太陽의 탑)) 형식으로 표기해줘. 위치는 필요없어
`;

function fetchArticleContentFromContentScript(callback) {
  if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage({ type: "GET_ARTICLE_CONTENT" }, (res) => {
      if (res && res.title && res.body) {
        console.log("[AI 교정] 읽은 기사 제목:", res.title);
        console.log("[AI 교정] 읽은 기사 본문:", res.body);
        callback(res.title, res.body);
      } else {
        setCorrectionResult(
          "⚠️ 기사 본문을 가져오지 못했습니다.\n\n기사 작성 폼이 열려 있어야 합니다."
        );
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

function setCorrectionResult(markdown, isSave = true) {
  const resultDiv = document.getElementById("ai-result");
  resultDiv.innerHTML = window.marked.parse(markdown);
  // 결과를 chrome.storage.local에 저장
  if (isSave && chrome && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({ lastCorrectionResult: markdown });
  }
}

async function fetchOpenAICorrection(apiKey, prompt, userInput) {
  const system_prompt = `
    당신은 한국어 기사 교정 전문가입니다.
번역한 내용이 번역 요청사항에 맞게 잘 번역되었는지 확인해서 잘못된 부분을 교정하고 교정된 부분에 대한 이유를 함께 반환해줘.
AI가 기사의 목적/스타일에 맞게 자연스럽게 한국어 기사로 구성할 수 있도록 안내합니다.
`;
  const user_prompt = `

아래 교정 요청사항을 참고해서 번역 결과를 교정해주고, 교정 된 부분은 이유와 함께 한칸씩 띄워서 보기좋게 반환해줘
각 항목, 교정 전/후, 이유 등을 마크다운 리스트(-, *), 굵게(**), 코드(\), 인용(>) 등으로 감싸주고 각 항목을 구분해줘

[교정 요청사항]
${prompt}

[번역 결과]
${userInput}

[교정 된 부분]
1. example1
- 교정 전:
- 교정 후:
- 이유:

---

2. example2
- 교정 전:
- 교정 후:
- 이유:

---

...

`;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: system_prompt },
        { role: "user", content: user_prompt },
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
function showArticlePreview(text) {
  const previewDiv = document.getElementById("article-preview");
  if (previewDiv) {
    // 앞뒤 공백 제거, 줄바꿈 → 공백, 80자 제한
    const summary = text.replace(/\s+/g, " ").trim().slice(0, 80);
    previewDiv.textContent = summary;
  }
}
function callAI() {
  setCorrectionResult("로딩중");
  getApiKey(async (apiKey) => {
    if (!apiKey) {
      console.log("[AI 교정] API Key 없음");
      return setCorrectionResult("[AI 교정] API Key 없음");
    }
    try {
      const value = getExtraInputValue();
      showArticlePreview(value);
      console.log("[AI 교정] fetchOpenAICorrection 시작");
      const result = await fetchOpenAICorrection(apiKey, FULL_PROMPT, value);
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
}

function handleCorrectionButton(options) {
  const button = document.getElementById("correction-btn");
  console.log(" button exist test");
  if (!button) return;
  if (options.onCorrection) {
    button.onclick = options.onCorrection;
  } else {
    button.onclick = async () => {
      console.log("[AI 교정] 버튼 클릭됨");
      callAI();
    };
  }
}

function renderPopup(options = {}) {
  const root = document.getElementById("popup-root");
  root.innerHTML = `
    <div>
      <textarea></textarea>
      <div class="ai-btn-row">
        <button class="ai-btn" id="correction-btn">AI 교정 요청</button>
        <button class="ai-btn ai-retry green" id="ai-retry-btn">재검토</button>
      </div>
      <div id="ai-result"></div>
      <div class="article-preview" id="article-preview">텍스트 입력창에 교정할 내용을 넣고 버튼을 눌러도 됩니다.</div>
    </div>
  `;
  fetchArticleContentFromContentScript((title, body) => {
    fillTextareaWithArticle(title, body);
  });
  handleCorrectionButton(options);
  const retryBtn = document.getElementById("ai-retry-btn");
  if (retryBtn) {
    retryBtn.onclick = async () => {
      fetchArticleContentFromContentScript((title, body) => {
        fillTextareaWithArticle(title, body);
      });
      callAI();
    };
  }
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
  };
}

// 팝업이 열릴 때 마지막 교정 결과 복원
if (chrome && chrome.storage && chrome.storage.local) {
  document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["lastCorrectionResult"], (result) => {
      if (result && result.lastCorrectionResult) {
        setCorrectionResult(result.lastCorrectionResult);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("popup-root");
  if (root) renderPopup();
});
