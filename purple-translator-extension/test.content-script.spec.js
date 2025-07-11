/**
 * @jest-environment jsdom
 */
// content script의 입력값 추출 기능 테스트

const { extractTitleAndBody } = require("./content-script");

describe("content script", () => {
  it("shouldExtractTitleAndBodyFromAdminContent", () => {
    // 가상의 DOM 구조 생성
    document.body.innerHTML = `
      <article class="admin-content">
        <header class="atl-view-header">
          <h2 class="heading">테스트 제목</h2>
        </header>
        <div class="wt-forms writing-editor">
          <div class="wt-forms-content">테스트 본문 내용</div>
        </div>
      </article>
    `;

    // content script의 추출 함수 (아직 미구현)
    const { title, body } = extractTitleAndBody();

    expect(title).toBe("테스트 제목");
    expect(body).toBe("테스트 본문 내용");
  });
});

describe("highlight feedback", () => {
  it("should highlight all occurrences of feedback words in the body with yellow background", () => {
    document.body.innerHTML = `
      <div class="wt-forms writing-editor">
        <div class="wt-forms-content">잘못된 표현과 또다른 문제, 잘못된 표현이 반복됩니다.</div>
      </div>
    `;
    // 예시 피드백 결과
    const feedback = [
      { text: "잘못된 표현", suggestion: "올바른 표현" },
      { text: "또다른 문제", suggestion: "다른 해결책" },
    ];
    // 하이라이트 함수(아직 미구현)
    const { highlightFeedbackInBody } = require("./content-script");
    highlightFeedbackInBody(feedback);
    const html = document.querySelector(".wt-forms-content").innerHTML;
    // 모든 피드백 단어가 span.highlight로 감싸져야 함
    expect(html).toContain('<span class="highlight"');
    // 잘못된 표현이 2번, 또다른 문제가 1번 하이라이트되어야 함
    expect((html.match(/<span class="highlight"/g) || []).length).toBe(3);
  });
});
