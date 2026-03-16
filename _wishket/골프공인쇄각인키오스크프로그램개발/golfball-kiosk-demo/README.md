# Golfball Kiosk Demo

골프공 인쇄/각인 키오스크 제안용 데모 앱입니다.

## What this demo shows

- 사용자 플로우: 디자인 입력 -> 주문 확인 -> 결제 -> 제작 시작
- 관리자 플로우: 장비 상태, 작업 큐, 결제 이력, 장비 로그 확인
- 장비 연동 구조: Mock Adapter 기반으로 프린터/결제기/커팅기 시뮬레이션
- 로컬 저장: localStorage로 주문/결제/작업/로그 데이터 유지

## Run

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 으로 접속해 시연할 수 있습니다.

## Notes

- 현재는 실장비 연동 전 단계이며, Adapter 인터페이스를 실제 SDK 연동으로 교체하면 됩니다.
- UI는 PRD/DESIGN_SYSTEM 문서 기준의 데모 우선 범위를 반영했습니다.
