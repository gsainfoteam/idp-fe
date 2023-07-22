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
  authorize: {
    error: "인증에 문제가 발생했습니다.",
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
};
