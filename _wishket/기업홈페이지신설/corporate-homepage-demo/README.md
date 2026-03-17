# Dareun Chemicals Homepage Demo

다른화학(주) (Dareun Chemicals) 공식 홈페이지 신규 구축 공고 대응용 데모 프로젝트입니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 검증 명령어

```bash
npm run lint
npm run build
```

## 구현 라우트

- /
- /about
- /products
- /products/[slug]
- /news
- /news/[slug]
- /contact
- /admin
- /admin/products
- /admin/news
- /admin/inquiries

## 데모 특징

- 메인 히어로 스태거 애니메이션
- 섹션 스크롤 리빌 애니메이션
- 제품/뉴스 카드 hover 모션
- 문의 접수 피드백 모션
- 관리자 로컬스토리지 기반 CRUD 데모

## 참고

- 이 프로젝트는 제안/검토용 데모이며, 실운영 보안/권한/서버 저장은 별도 고도화가 필요합니다.
