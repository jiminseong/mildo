# Idea Workshop Demo

중고등학생 대상 특허/발명 아이디어 고도화 교육 웹 서비스의 제안용 독립 데모 앱입니다.

## Overview

- 학생 워크스페이스와 운영자 콘솔을 하나의 프론트엔드 상태로 연결한 mock 프로토타입
- 로그인, 개인정보 입력, 진단, 카드 선택, 익명 피드백, 승인 흐름, 퀴즈까지 전체 기능 시연 가능
- 우측 상단 `가이드` 버튼으로 시연 포인트와 mock 범위를 바로 확인 가능

## Run

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

한글 경로 이슈를 피하기 위해 `dev`와 `build`는 `--webpack` 기준으로 설정했습니다.

## Verify

```bash
npm run lint
npm run build
```

## Documents

- `../PRD.md`: 기능 정의 및 단계 전이 기준
- `../TASK.md`: 작업 범위와 배포 메모
- `src/app/proposal-demo.tsx`: 메인 인터랙션
- `src/app/demo-data.ts`: seed 데이터와 단계 정의

## Deploy

Vercel에서는 이 폴더를 루트로 별도 프로젝트에 연결합니다.
