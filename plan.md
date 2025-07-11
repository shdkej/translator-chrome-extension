# translator-chrome-extension 개발 계획 (TDD)

## 1. 입력값 추출 테스트 (Red)

- [x] shouldExtractTitleAndBodyFromAdminContent: admin-content 내에서 제목(header.atl-view-header h2.heading)과 본문(main.atl-view-body)을 올바른 selector로 읽어올 수 있어야 한다.

## 2. Popup UI 테스트 (Red)

- [x] shouldRenderPromptAndExtraInputFields: Popup에서 교정 프롬프트(고정)와 추가 입력란이 모두 렌더링되어야 한다.
- [x] shouldRenderFullCorrectionPrompt: Popup에 실제 교정 프롬프트 전체 내용이 고정 텍스트로 렌더링되어야 한다.
- [x] shouldUpdateAndReadExtraInputValue: 추가 입력란(textarea)의 값이 상태로 관리되고, 외부에서 읽을 수 있어야 한다.
- [x] shouldRenderCorrectionButtonAndResult: 'AI 교정 요청' 버튼과 결과 표시 UI가 렌더링되고, 버튼 클릭 시 결과가 표시되어야 한다.
- [x] shouldCallOpenAIApiAndDisplayResult: 버튼 클릭 시 OpenAI API(mock) 호출 및 결과 표시가 동작해야 한다.
- [x] shouldCallRealOpenAIApiAndDisplayResult: 실제 OpenAI API 연동(fetch/post) 및 결과 표시가 동작해야 한다.

## 3. 크롬 익스텐션 구조화 (Red)

- [x] shouldHaveValidManifest: 크롬 익스텐션의 필수 manifest.json이 존재하고, popup, content script, permissions 등이 올바르게 선언되어야 한다.
- [x] shouldHavePopupHtml: popup.html 파일이 존재하고, 필수 구조(루트 div 등)가 포함되어야 한다.

## 4. 옵션 관리 (Red)

- [x] shouldSaveAndLoadApiKey: 옵션 페이지에서 OpenAI API Key를 저장하고, 다시 불러올 수 있어야 한다.
- [ ] shouldHaveOptionsHtml: options.html 파일이 존재하고, 필수 구조(input, button 등)가 포함되어야 한다.
