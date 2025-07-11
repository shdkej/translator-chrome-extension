# Purple Translator Extension

## 소개

- 기사 승인 화면에서 제목/본문을 추출해 OpenAI로 교정(번역) 피드백을 제공하는 크롬 익스텐션
- TDD & Tidy First 원칙으로 개발

## 주요 기능

- 기사 제목/본문 자동 추출 및 textarea 자동 채우기
- 프롬프트/추가 입력/AI 교정 결과 표시
- OpenAI API Key 옵션 관리
- 로딩/에러 UX, background 메시지 라우팅

## 설치 및 개발

1. 저장소 클론
   ```sh
   git clone <repo-url>
   cd purple-translator-extension
   ```
2. 의존성 설치
   ```sh
   yarn install
   ```
3. 테스트 실행
   ```sh
   yarn test
   ```

## 크롬 익스텐션 등록 (로컬 테스트)

1. 크롬 → 확장 프로그램 → '개발자 모드' 활성화
2. '압축해제된 확장 프로그램 로드' → 이 폴더 선택

## 배포

- manifest.json, popup.html, options.html, background.js, content-script.js, popup.js, options.js 등 포함
- 크롬 웹스토어 등록 가이드 참고

## 폴더/파일 구조

- popup.html / popup.js: 팝업 UI 및 로직
- options.html / options.js: 옵션 관리
- content-script.js: 기사 추출
- background.js: 메시지 라우팅
- manifest.json: 익스텐션 메타 정보

## 테스트

- Jest + jsdom 기반 단위/통합 테스트
- `yarn test`로 전체 테스트 실행

## 문의/기여

- 이슈/PR 환영!
