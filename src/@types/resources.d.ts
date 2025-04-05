interface Resources {
  translation: {
    register: {
      title: '회원가입';
      defaultInfo: '기본정보';
      email: 'GIST 이메일';
      password: '비밀번호';
      passwordConfirm: '비밀번호 확인';
      name: '이름';
      studentId: '학번';
      phoneNumber: '전화번호';
      next: '다음으로';
      errors: {
        email: '이메일 형식이 올바르지 않습니다.';
        password: '비밀번호 형식이 올바르지 않습니다.';
        passwordConfirm: '비밀번호가 일치하지 않습니다.';
        name: '이름을 입력해주세요.';
        studentId: '학번을 입력해주세요.';
        phoneNumber: '전화번호를 입력해주세요.';
      };
      examples: {
        name: '김지니';
      };
    };
    login: {
      login: '로그인';
      register: '회원가입';
      errors: {
        password: '비밀번호를 입력해주세요.';
        email: '이메일을 입력해주세요.';
        unauthorized: '이메일 또는 비밀번호가 올바르지 않습니다.';
      };
    };
    language: 'ko';
  };
}

export default Resources;
