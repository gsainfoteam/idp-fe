import { z } from 'zod';

// 유효성 검사를 위한 스키마 정의
const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1),
    passwordConfirm: z.string().min(1),
    name: z.string().min(1),
    studentId: z.string().regex(/^\d{8}$/),
    phoneNumber: z.string().regex(/^\d{3}-\d{4}-\d{4}$/),
    verificationJwtToken: z.string().min(1),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Password and password confirmation do not match',
    // path: ['passwordConfirm'], // 오류가 발생한 필드 지정
  });

// 테스트 코드
const testData1 = {
  email: 'test@example.com',
  password: 'password123',
  passwordConfirm: 'password1234', // 일치하지 않음
  name: 'John Doe',
  studentId: '12345678',
  phoneNumber: '0',
  verificationJwtToken: 'validToken123',
};

try {
  // 첫 번째 테스트 데이터 (비밀번호가 일치하지 않음)
  schema.parse(testData1); // 여기서 오류 발생
} catch (e) {
  if (e instanceof z.ZodError) {
    console.log(e.errors);
    console.log('email', e.errors.email);
    console.log('password', e.errors.password);
    console.log('passwordConfirm', e.errors.passwordConfirm);
    console.log('name', e.errors.name);
    console.log('studentId', e.errors.studentId);
    console.log('phoneNumber', e.errors.phoneNumber);
    console.log('verificationJwtToken', e.errors.verificationJwtToken);
  }
}

// try {
//   // 두 번째 테스트 데이터 (비밀번호가 일치함)
//   schema.parse(testData2);  // 정상적으로 통과
// } catch (e) {
//   if (e instanceof z.ZodError) {
//     console.log("두 번째 테스트 데이터에서 오류 발생:");
//     e.errors.forEach(err => {
//       console.log(`필드: ${err.path.join(' -> ')}, 오류 메시지: ${err.message}`);
//     });
//   }
// }
