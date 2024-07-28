export const main = {
  email: {
    label: "Email",
    placeholder: "Email",
    example: "xxx@gm.gist.ac.kr / .gist.ac.kr",
    verify: {
      action: "Send Verification",
      tryLater:
        "Verification request is only available once per minute. Please try again later.",
      left: "Remaining time: {time}",
      wrongEmail: "Please check your email again.",
      timeout: "Verification time has expired.",
      notVerified: "Unverified email.",
      success: "Verification email has been sent.",
      error: "Failed to request verification.",
    },
  },
  verificationCode: {
    label: "Verification Code",
    placeholder: "Verification Code",
    verify: {
      action: "Verify",
      complete: "Verification is complete.",
      error: "Failed to verify.",
    },
  },
  password: {
    label: "Password",
    placeholder: "Password",
  },
  passwordConfirm: {
    label: "Password Confirm",
    placeholder: "Password Confirm",
    error: "Passwords do not match.",
  },
  name: {
    label: "Name",
    placeholder: "Name",
  },
  studentId: {
    label: "Student ID",
    placeholder: "Student ID",
  },
  phoneNumber: {
    label: "Phone Number",
    placeholder: "Phone Number",
  },
  login: {
    action: "Login",
    error: "Failed to login.",
  },
  findPassword: {
    action: "Find Password",
    new: {
      label: "New Password",
      placeholder: "New Password",
    },
    newConfirm: {
      label: "New Password Confirm",
      placeholder: "New Password Confirm",
    },
    change: {
      action: "Change Password",
      error: "Failed to change password.",
      success: "Password has been changed.",
    },
  },
  register: {
    action: "Register",
    back: "Back to login page",
    duplicate: "Email already exists.",
    error: "Failed to register.",
    success: "Registration is complete.",
  },
  profile: {
    userInfo: "User Information",
    edit: "Edit",
    services: {
      title: "Connected Services",
      ziggle: {
        title: "Ziggle",
        description: "Every notices in GIST at a glance",
      },
      andromeda: {
        title: "andromeda",
        description: "새롭고 빛나는 수강평 서비스",
      },
    },
    passkey: {
      title: "Passkey Management",
      register: "Register new Passkey",
    },
    connected: "Connected",
    connect: "Connect Now",
    withdraw: {
      action: "Delete Account",
      confirm:
        "Are you sure you want to delete your account? You cannot use the connected services after withdrawal.",
      progress: "Deleting account...",
      cancel: "Cancel",
      fail: "Failed to withdraw.",
      success: "Account has been deleted.",
    },
  },
  authorize: {
    title: "'{{application}}' wants to use GSA integrated account for login",
    description: "{{application}} is requesting access to the following items",
    action: "Agree",
    scopes: {
      openid: "OpenID",
      offline_access: "Offline Access",
      profile: "Profile",
      email: "Email",
      phone: "Phone Number",
      student_id: "Student ID",
    },
  },
};
