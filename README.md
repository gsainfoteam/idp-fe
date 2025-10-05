# IdP Frontend

GIST 메일로 로그인 서비스의 프론트엔드 애플리케이션입니다. OAuth 2.1, OIDC 기반의 인증 시스템과 패스키(Passkey) 인증을 지원하는 현대적인 웹 애플리케이션입니다.

## 🚀 기술 스택

- **Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Language**: TypeScript 5.7.3
- **Routing**: TanStack Router 1.127.3
- **State Management**: **Zustand** 5.0.6
- **Data Fetching**: TanStack React Query 5.83.0
- **Styling**: Tailwind CSS 4.1.11
- **UI Components**: Custom components with Radix UI primitives
- **Form Handling**: React Hook Form 7.60.0 + Zod 3.25.76
- **Animation**: Motion 12.23.3
- **Internationalization**: React i18next 15.6.0
- **Testing**: Vitest 3.2.4 + Playwright 1.54.1
- **Storybook**: 8.6.14

## 📁 프로젝트 구조

```txt
src/
├── @types/                 # TypeScript 타입 정의
│   ├── api-schema.d.ts     # OpenAPI 스키마 타입
│   ├── env.d.ts            # 환경 변수 타입
│   ├── history-state.d.ts  # 히스토리 상태 타입
│   └── i18next.d.ts        # i18next 타입
├── assets/                 # 정적 자산
│   ├── icons/              # 아이콘 파일들
│   └── logos/              # 로고 파일들
├── data/                   # API 호출 함수들
├── features/               # 기능별 모듈
│   ├── [feature name]/
│   │   ├── components      # 컴포넌트들
│   │   ├── frames          # router에 쓰이는 화면들
│   │   ├── hooks           # frame, component에서 쓰이는 비즈니스 로직
│   │   ├── services        # data를 호출하는데에 쓰이는 파일
│   │   └── utils           # 유틸
│   ├── auth/               # 인증 관련
│   ├── client/             # 클라이언트 관리
│   ├── core/               # 공통 컴포넌트 및 유틸리티
│   ├── oauth/              # OAuth 인증
│   ├── passkey/            # 패스키 관리
│   ├── profile/            # 프로필 관리
│   └── withdraw/           # 계정 탈퇴
├── locales/                # 다국어 지원
├── routes/                 # 라우팅 설정
│   ├── __root.tsx          # 루트 라우트
│   ├── _auth-required/     # 인증 필요 페이지들
│   └── auth/               # 인증 페이지들
├── stories/                # Storybook 스토리
├── styles/                 # CSS 스타일 파일들
├── app.ts x                # 루트, 라우터 생성 등
└── main.tsx                # 애플리케이션 진입점
```

## 🎯 주요 기능

### 🔐 인증 시스템

- **이메일 인증**: GIST 이메일을 통한 회원가입 및 로그인
- **패스키 인증**: WebAuthn 기반 생체인증 및 하드웨어 키 지원
- **OAuth 2.0**: 서드파티 서비스 연동을 위한 OAuth 인증
- **비밀번호 관리**: 비밀번호 변경 및 임시 비밀번호 발급

### 👤 사용자 관리

- **프로필 관리**: 사용자 정보 수정 및 프로필 이미지 관리
- **패스키 관리**: 등록된 패스키 목록 조회, 이름 변경, 삭제
- **계정 탈퇴**: 안전한 계정 삭제 프로세스

### 🛠️ 개발자 센터

- **클라이언트 관리**: OAuth 클라이언트 등록 및 관리
- **스코프 설정**: 사용자 정보 접근 권한 설정
- **리다이렉트 URI 관리**: OAuth 콜백 URL 설정

## 🚀 시작하기

### 필수 요구사항

- Node.js 20+
- Bun

### 설치 및 실행

```bash
# 의존성 설치
bun install

# 개발 서버 실행
bun run dev

# 빌드
bun run build

# 스토리북 실행
bun run storybook

# 린트 검사
bun run lint
```

## 🏗️ 아키텍처

### Feature-Based 구조

각 기능별로 독립적인 모듈로 구성되어 있어 유지보수성과 확장성이 뛰어납니다:

- `auth/`: 인증 관련 로직
- `client/`: OAuth 클라이언트 관리
- `core/`: 공통 컴포넌트 및 유틸리티
- `passkey/`: 패스키 인증 관리
- `profile/`: 사용자 프로필 관리

### 상태 관리

- **Zustand**: 전역 상태 관리
- **TanStack React Query**: 서버 상태 관리 및 캐싱
- **React Hook Form**: 폼 상태 관리

### 라우팅

- **TanStack Router**: 타입 안전한 라우팅
- **View Transitions**: 부드러운 페이지 전환
- **인증 가드**: 보호된 라우트 자동 리다이렉트

## 🎨 UI/UX

### 디자인 시스템

- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **다크 모드**: 시스템 테마 자동 감지
- **반응형 디자인**: 모바일 퍼스트 접근

## 🌐 다국어 지원

한국어와 영어를 지원하며, `react-i18next`를 사용하여 동적 언어 전환이 가능합니다.

## 📚 스토리북

컴포넌트 문서화 및 개발을 위한 Storybook이 포함되어 있습니다:

```bash
bun run storybook
```

## 🔧 개발 도구

- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅
- **TypeScript**: 정적 타입 검사

## 📝 API 연동

OpenAPI 스키마를 기반으로 자동 생성된 타입과 API 클라이언트를 사용합니다:

```bash
# API 스키마 업데이트
bun run gen-oas
```

## 🚀 배포

```bash
# 프로덕션 빌드
bun run build

# 미리보기
bun run preview
```

## 📄 라이선스

이 프로젝트는 AGPL-3.0 라이선스 하에 있습니다.
