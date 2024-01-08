export const main = {
  email: {
    label: "이메일",
    placeholder: "Email",
    example: "xxx@gm.gist.ac.kr / .gist.ac.kr",
    verify: {
      action: "인증 요청",
      tryLater:
        "인증 요청은 1분에 한 번만 가능합니다. 잠시 후 다시 시도해주세요.",
      left: "남은 시간 : {time}",
      wrongEmail: "이메일을 다시 확인해주세요.",
      timeout: "인증 시간이 초과되었습니다.",
      notVerified: "인증되지 않은 이메일입니다.",
      success: "인증 메일이 발송되었습니다.",
      error: "인증 요청에 실패하였습니다.",
    },
  },
  verificationCode: {
    label: "인증번호",
    placeholder: "Verification Code",
    verify: {
      action: "인증하기",
      complete: "인증이 완료되었습니다.",
      error: "인증에 실패하였습니다.",
    },
  },
  password: {
    label: "비밀번호",
    placeholder: "Password",
  },
  passwordConfirm: {
    label: "비밀번호 확인",
    placeholder: "Password Confirm",
    error: "비밀번호가 일치하지 않습니다.",
  },
  name: {
    label: "이름",
    placeholder: "Name",
  },
  studentId: {
    label: "학번",
    placeholder: "Student ID",
  },
  phoneNumber: {
    label: "전화번호",
    placeholder: "Phone Number",
  },
  login: {
    action: "로그인",
    error: "로그인에 실패하였습니다.",
  },
  findPassword: {
    action: "비밀번호 찾기",
    new: {
      label: "새 비밀번호",
      placeholder: "New Password",
    },
    newConfirm: {
      label: "새 비밀번호 확인",
      placeholder: "New Password Confirm",
    },
    change: {
      action: "비밀번호 변경",
      error: "비밀번호 변경에 실패하였습니다.",
      success: "비밀번호가 변경되었습니다.",
    },
  },
  register: {
    action: "회원가입",
    back: "로그인 페이지로 돌아가기",
    error: "회원가입에 실패하였습니다.",
    success: "회원가입이 완료되었습니다.",
  },
  profile: {
    userInfo: "유저 정보",
    edit: "수정",
    services: {
      title: "연결된 서비스",
      ziggle: {
        title: "지글",
        description: "지스트의 모든 공지를 한눈에.",
      },
      andromeda: {
        title: "andromeda",
        description: "새롭고 빛나는 수강평 서비스",
      },
    },
    connected: "연결됨",
    connect: "지금 연결",
    withdraw: {
      action: "회원탈퇴",
      confirm:
        "정말로 탈퇴하시겠습니까? 탈퇴 후에는 연결된 서비스를 이용할 수 없습니다.",
      progress: "회원탈퇴 중입니다...",
      cancel: "취소",
      fail: "회원탈퇴에 실패하였습니다.",
      success: "회원탈퇴가 완료되었습니다.",
    },
  },
  authorize: {
    title: "'{{application}}'에서 GSA 통합 계정으로 로그인을 사용하려고 합니다",
    description: "{{application}}이 접근할 수 있는 항목을 선택해주세요",
    action: "동의",
    scopes: {
      openid: "OpenID",
      offline_access: "오프라인 액세스",
      profile: "프로필",
      email: "이메일",
      phone: "전화번호",
      student_id: "학번",
    },
  },
};
