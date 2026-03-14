# mildo

밀도(`mildolab.com`)의 공식 웹사이트 저장소입니다.  
자영업자용 웹·예약 패키지, 고도 개발, 업무 자동화 서비스를 소개하고 포트폴리오와 문의를 연결하는 Next.js 기반 마케팅 사이트입니다.

## Overview

- 메인 랜딩에서 `local`, `advanced`, `automation` 3개 서비스 라인으로 진입합니다.
- 포트폴리오 목록과 상세 페이지를 통해 실제 작업 사례를 보여줍니다.
- 문의 폼 제출 시 Supabase에 상담 내역을 저장하고 이메일 알림을 발송합니다.
- 기본 SEO, Open Graph, 구조화 데이터, sitemap/robots 설정을 포함합니다.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase
- Nodemailer
- Lucide React
- Framer Motion

## Main Routes

- `/` : 서비스 분기 랜딩 페이지
- `/local` : 자영업 패키지 소개
- `/advanced` : MVP, 백오피스 등 고도 개발 소개
- `/automation` : 반복 업무 자동화 소개
- `/portfolio` : 포트폴리오 목록
- `/portfolio/[id]` : 포트폴리오 상세
- `/process` : 프로젝트 진행 방식
- `/faq` : 자주 묻는 질문
- `/contact` : 상담 문의 폼

## Project Structure

```text
src/
  app/
    api/send-email/        # 문의 알림 메일 발송 API
    contact/               # 상담 문의 폼
    local/                 # 자영업 패키지 소개 페이지
    advanced/              # 고도 개발 소개 페이지
    automation/            # 자동화 소개 페이지
    portfolio/             # 포트폴리오 목록/상세
    process/               # 진행 프로세스 안내
    faq/                   # FAQ
  components/
    analytics/             # GTM 스크립트
    layout/                # 헤더, 푸터, 이벤트 배너
  lib/
    data.ts                # 포트폴리오 데이터 소스
    supabase/client.ts     # Supabase 클라이언트

portfolio/                 # 프로젝트별 내부 참고 문서
wishket/                   # 위시켓 지원 문서 작업 공간
```

## Local Development

### 1. Install

```bash
npm install
```

### 2. Create `.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
EMAIL_USER=...
EMAIL_PASS=...
```

환경 변수 설명:

- `NEXT_PUBLIC_SUPABASE_URL`: 문의 데이터를 저장할 Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 클라이언트에서 사용하는 Supabase anon key
- `EMAIL_USER`: Gmail SMTP 발신 계정
- `EMAIL_PASS`: Gmail 앱 비밀번호

### 3. Run

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 됩니다.

## Required Backend Setup

문의 폼은 Supabase의 `contacts` 테이블에 저장됩니다. 최소한 아래 필드는 필요합니다.

- `service_type`
- `name`
- `contact`
- `content`
- `budget`
- `schedule`
- `reference_url`
- `status`

또한 `/api/send-email`은 Gmail SMTP를 사용하므로 일반 비밀번호가 아니라 앱 비밀번호를 써야 합니다.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Content Update Guide

- 포트폴리오 항목 추가/수정: `src/lib/data.ts`
- 홈/서비스 페이지 문구 수정: `src/app/**/*.tsx`
- 상단 이벤트 배너 수정: `src/components/layout/EventBanner.tsx`
- 문의 메일 제목/본문 수정: `src/app/api/send-email/route.ts`

## Notes

- `wishket/` 폴더는 운영 문서용이며 앱 코드에서 import 하지 않습니다.
- GTM ID와 일부 메타데이터는 현재 코드에 하드코딩되어 있습니다.
- 문의 성공 여부는 Supabase 저장과 메일 발송 흐름에 모두 영향을 받습니다.
