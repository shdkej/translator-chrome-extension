// 마크다운 줄바꿈 옵션 활성화
window.marked.setOptions({
  breaks: true,
  gfm: true,
});

const FULL_PROMPT = `
1. 서사형 기사 vs 보도형 기사 구분
먼저 기사 전체를 분석하여, **기자의 감상·체험이 중심이 되는 '서사형 기사'**인지, **사실 전달이 주목적인 '보도형 기사'**인지 구분한다.

서사형 기사인 경우:
기자의 느낌, 시선, 감탄 등 구어체 표현이나 감정 서술이 포함된 문장은 불필요하게 형식적인 기사체로 수정하지 말고 원래 톤을 유지한다.
다만, 어색하거나 과도한 감탄 표현은 보다 자연스럽고 문장 흐름에 어울리는 형태로 다듬는 수준에서 교정한다.

예시:
교정 전: 고쿠라의 첫인상은 ‘레트로하다!’는 것이었다.
교정 후 (❌ 형식적): 고쿠라에 대한 첫인상은 ‘레트로’라는 것이었다.

보도형 기사인 경우:
감탄, 주관적 판단이 들어간 표현은 자제하고, 중립적이고 명료한 기사 문체로 교정한다.
📌 기사 스타일에 따라 문장 톤을 무조건 통일하지 말고, 문맥에 따라 유연하게 적용할 것.

✍️ 2. 문장 표현 및 어투 점검
서사형 기사 인지 보도형 기사인지에 따라 다음 사항을 유연하게 적용할 것

항목 및 교정 기준
- 신조어 / 은어 / 구어체 : 서사형 기사인 경우 자연스럽게 쓰인 구어체는 불필요하게 제거하지 않음. 단, 지나치게 비격식적이거나 유행어에 의존한 표현은 표준 표현으로 정리. 보도형 기사에서는 모든 신조어/은어/구어체를 정제된 기사 문체로 교체.
- 감탄 표현 및 감정어 : 서사형 기사에서는 기자의 감정이나 느낌을 전달하는 자연스러운 감탄 표현은 허용. 다만, 과도하거나 문장 흐름을 해치는 경우는 다듬어서 자연스럽게 표현. 보도형 기사에서는 감탄 표현은 지양하고, 행동 + 감정 원인 구조로 객관적으로 전달될 수 있도록 수정.
- 어투 : 전체 어투가 과도하게 캐주얼하거나 유행어 중심이 되지 않도록 주의. 필요시 기사톤에 맞게 전문적이고 보편적인 문장 톤으로 정돈.

✂️ 3. 문장 구조 및 구성 검토
의미가 중복되거나 반복된 단어, 문장 제거
불필요하게 설명투거나 부자연스러운 구문 정리 (예: “~을 칭하는 말로” → “~은 ~이다”)
시간·공간 전환 표현이 명확하고 간결한 연결어로 구성되었는지 확인
배경 → 핵심 정보 순으로 정보가 배치되어 있는지 점검

🉐 4. 외래어 표기법 점검 (국립국어원 2025 기준)
지명, 인명, 고유명사는 외래어 표기법을 정확히 따랐는지 확인
다음 4계열은 어두/어중·어말 위치에 따라 표기가 달라지는지 확인

계열	어두	어중·어말
カ행	가, 기, 구, 게, 고	카, 키, 쿠, 케, 코
タ행	다, 지, 쓰, 데, 도	타, 치, 쓰, 테, 토
キャ・キュ・キョ	갸, 규, 교	캬, 큐, 쿄
チャ・チュ・チョ	자, 주, 조	차, 추, 초
그 외 대부분 가나는 위치 관계없이 항상 동일 표기
예: ジャ → 자, ジュ → 주, ジョ → 조

표기 방식은 문서 전체에서 일관되게 유지
일본 인명은 반드시 일본어 발음 기준의 한국어 표기로 되어 있는지 확인 (예: 石破茂 → 이시바 시게루)
고유명사(시설명, 작품명 등)는 한국어 뜻(일본어 원문) 형식으로 되어 있는지 확인 (예: 태양의 탑(太陽の塔))
일본 내 지역명 중 **일본 현지에서 널리 통용되고 자연스러운 발음(로마자/히라가나/카타카나)**이 존재하고,** 그 뒤에 한자 표기(예: 南京町, 銀閣寺 등)**가 함께 병기된 경우에는, 국립국어원 외래어 표기법 대신 현지 발음 + 한자 병기 형식을 허용한다.

🇰🇷 5. 맞춤법 및 단어 표현 교정
띄어쓰기, 된소리, 표준어 사용 점검 (예: 망서림 → 망설임, 쌉사름 → 쌉싸름)
색상 표현은 형용사 활용형으로 사용 (예: 빨강색 → 빨간색)
기사 내 ‘나’ → 항상 ‘필자’로 바뀌었는지 확인

🖼️ 6. 형식 및 표기 통일성
항목	교정 기준
드라마/애니 제목	'작품명' → <작품명>
노래 제목	'노래 제목' 형태 유지
방향 표기	(좌), (우) → (왼쪽), (오른쪽)
사진 설명	(사진촬영 기자) → (사진 출처: 기자)
역사 시대	시대명 + 시대 + (연도) 형식 (예: 헤이안시대(794~1185))
국가 병기	‘미국과 중국’ → ‘미·중’, ‘한·일’, ‘한·중·일’ 등

** 반드시 지켜야 하는 규칙 Strict Rule! **
- 기사에 없는 내용, AI의 추정, 상상, 일반적 배경 설명, 맥락 보강, 일반화, 추가 설명 등은 절대 하지말것.
- 반드시 기사 원문에 있는 내용으로만 교정해줄 것
- 교정이 필요없는 문장의 경우 언급 안해도 됨
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

function splitMarkdownByDashes(markdown) {
  // --- 또는 빈 줄로 robust하게 분리
  return markdown
    .split(/(?:^|\n)---+\n/g)
    .map((block) => block.trim())
    .filter((block) => block.length > 0);
}

function parseCorrectionsFromMarkdown(markdown) {
  // 각 항목을 블록 단위로 분리 (--- 또는 빈 줄로 구분)
  const blocks = markdown
    .split(/(?:^|\n)---+\n/g) // ---로 구분
    .map((block) => block.trim())
    .filter(
      (block) => block && /교정 전:/.test(block) && /교정 후:/.test(block)
    );

  const corrections = [];
  for (const block of blocks) {
    // 각 항목에서 교정 전/후/이유 추출
    const beforeMatch = block.match(/- ?교정 전:\s*(.+)/);
    const afterMatch = block.match(/- ?교정 후:\s*(.+)/);
    // 이유는 마지막에 있을 수 있으므로 [^\n]+ 대신 .+로
    const reasonMatch = block.match(/- ?이유:\s*(.+)/);

    if (beforeMatch && afterMatch) {
      corrections.push({
        before: beforeMatch[1].trim(),
        after: afterMatch[1].trim(),
        reason: reasonMatch ? reasonMatch[1].trim() : "",
      });
    }
  }
  // blocks 배열도 함께 반환하거나 활용 가능
  // 예: return { corrections, blocks };
  return corrections;
}

function showCorrectionsUI(corrections, markdown, checkedStates = []) {
  const container = document.getElementById("correction-ui");
  if (!container) return;
  container.style.display = "";
  // 버튼 스타일 클래스 정의 (최초 1회만 추가)
  if (!document.getElementById("ai-btn-style")) {
    const style = document.createElement("style");
    style.id = "ai-btn-style";
    style.textContent = `
      .ai-btn-blue { background: #3b82f6 !important; color: #fff !important; border: none !important; }
      .ai-btn-blue:hover { background: #2563eb !important; }
      .ai-btn-gray { background: #e5e7eb !important; color: #222 !important; border: none !important; }
      .ai-btn-gray:hover { background: #d1d5db !important; }
    `;
    document.head.appendChild(style);
  }
  const correctionsHtml = `
    <div style="margin-bottom:8px;font-weight:bold;">교정 항목을 선택하고 '반영하기'를 누르세요</div>
    <div class="ai-result" id="correction-checkbox-list" style="margin-bottom:8px;">
      ${corrections
        .map(
          (c, i) =>
            `<div class="correction-block" style="display:flex;align-items:flex-start;margin-bottom:8px;">
              <input type="checkbox" data-idx="${i}" style="margin-right:8px;" ${
              checkedStates[i] ? "checked" : ""
            } />
              <div class="correction-content" style="flex:1;">
                ${
                  c.title
                    ? `<div style='font-weight:bold;'>${c.title}</div>`
                    : ""
                }
                <div><b>교정 전:</b> ${c.before}</div>
                <div><b>교정 후:</b> ${c.after}</div>
                ${
                  c.reason
                    ? `<div style='color:#888;'><b>이유:</b> ${c.reason}</div>`
                    : ""
                }
              </div>
            </div>`
        )
        .join("")}
    </div>
    <div style="margin-bottom:8px;display:flex;align-items:center;gap:8px;">
      <button class="ai-btn ai-btn-blue" id="apply-corrections-btn" style="font-size:13px;padding:4px 10px;">반영하기</button>
      <button class="ai-btn" id="select-all-corrections-btn" type="button" style="font-size:13px;padding:4px 10px;">전체 선택</button>
      <button class="ai-btn" id="deselect-all-corrections-btn" type="button" style="font-size:13px;padding:4px 10px;">전체 해제</button>
      <button class="ai-btn ai-btn-gray" id="toggle-md-btn" style="font-size:13px;padding:4px 10px;margin-left:auto;">원본 교정 결과 보기</button>
    </div>
    <div id="correction-md-view" style="display:none;margin-top:12px;"></div>
    <div id="apply-msg" style="color:green;margin-top:8px;display:none;">반영 완료!</div>
  `;
  container.innerHTML = correctionsHtml;
  // textarea에 기사 원문 자동 채우기 (이전 값이 있으면 그대로)
  const textarea = document.querySelector("textarea");
  if (textarea && !textarea.value) {
    fetchArticleContentFromContentScript((title, body) => {
      textarea.value = `${title}\n${body}`;
    });
  }
  // 전체 선택/해제 버튼 핸들러
  const selectAllBtn = document.getElementById("select-all-corrections-btn");
  const deselectAllBtn = document.getElementById(
    "deselect-all-corrections-btn"
  );
  const checkboxList = () =>
    document.querySelectorAll(
      "#correction-checkbox-list input[type='checkbox']"
    );
  if (selectAllBtn) {
    selectAllBtn.onclick = () => {
      checkboxList().forEach((cb) => {
        cb.checked = true;
      });
      saveCheckedStates();
    };
  }
  if (deselectAllBtn) {
    deselectAllBtn.onclick = () => {
      checkboxList().forEach((cb) => {
        cb.checked = false;
      });
      saveCheckedStates();
    };
  }
  // 체크박스 변경 시 상태 저장
  function saveCheckedStates() {
    const checkedArray = Array.from(checkboxList()).map((cb) => cb.checked);
    chrome.storage.local.set({ lastCorrectionChecked: checkedArray });
  }
  checkboxList().forEach((cb) => {
    cb.addEventListener("change", saveCheckedStates);
  });
  // 반영하기 버튼 핸들러
  const applyBtn = document.getElementById("apply-corrections-btn");
  if (applyBtn) {
    applyBtn.onclick = () => {
      let value = textarea.value;
      const checkboxes = checkboxList();
      // 선택된 교정만 배열로 추출
      const selectedCorrections = corrections.filter(
        (cor, idx) => checkboxes[idx].checked
      );
      // 본문 치환 (textarea에도 반영)
      selectedCorrections.forEach(({ before, after }) => {
        value = value.replaceAll(before, after);
      });
      textarea.value = value;
      // 실제 기사 입력창에 반영 (선택된 corrections 배열 전달)
      sendCorrectionToContentScript(selectedCorrections);
      // 반영 완료 메시지 표시
      const msg = document.getElementById("apply-msg");
      msg.style.display = "block";
      setTimeout(() => {
        msg.style.display = "none";
      }, 1000);
    };
  }
  // 마크다운 토글 버튼
  const toggleBtn = document.getElementById("toggle-md-btn");
  const mdView = document.getElementById("correction-md-view");
  if (toggleBtn && mdView) {
    toggleBtn.onclick = () => {
      if (mdView.style.display === "none") {
        mdView.style.display = "block";
        mdView.innerHTML = window.marked.parse(markdown || "");
      } else {
        mdView.style.display = "none";
      }
    };
  }
  // 교정 리스트와 체크 상태를 항상 저장
  chrome.storage.local.set({ lastCorrectionResult: markdown });
  saveCheckedStates();
}

function setCorrectionResult(markdown, isSave = true, checkedStates = []) {
  const corrections = parseCorrectionsFromMarkdown(markdown);
  const blocks = splitMarkdownByDashes(markdown);
  console.log("blocks (---로 분리):", blocks);
  const container = document.getElementById("correction-ui");
  // 로딩중일 때는 교정리스트 숨김
  if (typeof markdown === "string" && markdown.trim().includes("로딩중")) {
    if (container) container.innerHTML = "";
    const resultDiv = document.getElementById("ai-result");
    if (resultDiv)
      resultDiv.innerHTML =
        "<div style='text-align:center;padding:24px 0;'>로딩중...</div>";
    return;
  }
  if (corrections.length > 0) {
    if (container) container.style.display = "";
    showCorrectionsUI(corrections, markdown, checkedStates);
    return;
  }
  if (container) container.innerHTML = "";
  const resultDiv = document.getElementById("ai-result");
  resultDiv.innerHTML = window.marked.parse(markdown);
  if (isSave && chrome && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({ lastCorrectionResult: markdown });
  }
}

async function fetchOpenAICorrection(apiKey, prompt, userInput) {
  const system_prompt = `
    당신은 한국에 거주하며 활동하는 한국어 기사 교정 전문가입니다.
    일본 관련 소식을 한국에 소개하는 기사 초안을 점검하고 교정하는 것이 주된 역할입니다.
    당신은 주로 신입 또는 중급 기자들이 일본 관련 내용을 기사화한 원고를 검토합니다.

    당신의 임무는 다음과 같습니다:
    한국어 맞춤법, 띄어쓰기, 조사, 어색한 문장 표현을 전면 점검합니다.
    기사 전체에서 형식, 문장 톤, 표기 방식의 통일성 유지 여부를 확인합니다. (예: 작품명 꺾쇠괄호 사용 여부, 시대 표기 방식, 사진 출처 표기 통일 등)
    일본 지명, 인명, 용어 등에 대해 2025년 기준 국립국어원 외래어 표기법을 적용했는지 철저히 검토합니다. (예: ケイオウ → 게이오, つるがしま → 쓰루가시마)
    번역된 내용이 번역 요청 지침(기사 스타일, 목적, 톤 등)을 충실히 따랐는지를 확인합니다.
    잘못된 표현이나 지침에 어긋난 부분이 있다면, 수정한 문장과 그에 대한 교정 사유를 함께 반환해야 합니다.
    AI가 스스로 기사의 목적과 스타일에 맞게 자연스럽고 신뢰도 높은 한국어 기사를 작성할 수 있도록 문장 구성과 표현을 안내합니다.
    ❗ 단, 기사에 없는 내용을 임의로 보완하거나 AI가 추정해서 넣는 것은 절대 금지입니다.
`;
  const user_prompt = `

아래 교정 요청사항을 참고해서 번역 결과를 교정해주고, 교정 된 부분은 이유와 함께 한칸씩 띄워서 보기좋게 반환해줘
교정 전:, 교정 후: 라벨 내부에는 반드시 **아무런 HTML 태그나 마크다운 문법(예: **굵게**, <strong>, <br> 등)**도 포함하지 마세요.
해당 라벨은 단순 텍스트로 유지되어야 하며, 기계가 문자열 매칭으로 처리하므로 형식이 변경되면 안 됩니다.
강조, 색상, 줄바꿈 등 시각적 표현은 절대 사용하지 말고, 설명은 이유: 항목에 평문으로만 작성해주세요.

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
  // feedback이 배열이 아니면 splitMarkdownByDashes로 블록 배열로 변환 후 객체로 파싱
  let feedbackArr = feedback;
  if (!Array.isArray(feedback)) {
    feedbackArr = splitMarkdownByDashes(feedback).map((block) => {
      const textMatch = block.match(/-? ?교정 전:\s*(.+)/);
      const suggestionMatch = block.match(/-? ?교정 후:\s*(.+)/);
      return {
        text: textMatch ? textMatch[1].trim() : block.trim(),
        suggestion: suggestionMatch ? suggestionMatch[1].trim() : "",
      };
    });
  }
  if (!Array.isArray(feedbackArr)) return;
  if (!chrome.tabs || !chrome.tabs.query || !chrome.tabs.sendMessage) return;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0]) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          type: "HIGHLIGHT_FEEDBACK",
          feedback: feedbackArr,
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
      console.log("[AI 교정] fetchOpenAICorrection 성공");
      setCorrectionResult(result);
      sendHighlightToContentScript(result);
    } catch (e) {
      console.log("[AI 교정] fetchOpenAICorrection 실패", e);
      setCorrectionResult("[AI 교정] fetchOpenAICorrection 실패");
    }
  });
}

function handleCorrectionButton(options) {
  const button = document.getElementById("correction-btn");
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

function sendCorrectionToContentScript(body, title) {
  console.log("1. send in popup", body);
  if (
    window.chrome &&
    chrome.tabs &&
    chrome.tabs.query &&
    chrome.tabs.sendMessage
  ) {
    console.log("2. in if");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("3. in query");
      if (tabs && tabs[0]) {
        console.log("4. its done");
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: "APPLY_CORRECTION", payload: { body, title } },
          () => {}
        );
      }
    });
  }
}

function renderPopup(options = {}) {
  const root = document.getElementById("popup-root");
  root.innerHTML = `
    <div>
      <div class="ai-btn-row" style="margin-bottom:12px;">
        <button class="ai-btn" id="correction-btn">AI 교정 요청</button>
        <button class="ai-btn ai-retry green" id="ai-retry-btn">재검토</button>
      </div>
      <textarea></textarea>
      <div id="correction-ui"></div>
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

// 팝업이 열릴 때 마지막 교정 결과와 체크 상태 복원
if (chrome && chrome.storage && chrome.storage.local) {
  document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(
      ["lastCorrectionResult", "lastCorrectionChecked"],
      (result) => {
        if (result && result.lastCorrectionResult) {
          setCorrectionResult(
            result.lastCorrectionResult,
            false,
            result.lastCorrectionChecked || []
          );
        }
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("popup-root");
  if (root) renderPopup();
});
