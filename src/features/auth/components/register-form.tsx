import { useFormContext } from 'react-hook-form';

import { RegisterFormSchema } from '../hooks/use-register-form';

export const RegisterForm = () => {
    const { register, formState } = useFormContext<RegisterFormSchema>();

    // check all formState errors into one single const
    const allErrors = Object.values(formState.errors);
    const hasErrors = allErrors.length > 0;

    console.log(formState.errors)

    return (
        <div className="flex justify-center h-screen">
            <div className="flex flex-col p-[20px] pt-[24px] w-[361px]">
                <div className="flex flex-col">
                    <span className="text-title-1 mb-3">회원가입</span>
                    <span className="text-title-3">기본정보</span>
                    <span className="text-label-1 mb-1 mt-2.5 text-[#3d3d3d]">GIST 이메일</span>
                    <input
                        className={`border-1 mb-0.5 rounded-sm p-2 px-2.5 ${formState.errors.email ? 'border-red-600 placeholder-red-600 text-red-600' : 'border-[#888888] placeholder-[#888888]'
                            }`}
                        {...register('email')}
                        type="email"
                        placeholder="hello@gm.gist.ac.kr"
                    />
                    <span className='text-red-600 text-sm'>
                        {formState.errors.email ? (
                            formState.errors.email?.message
                        ) : ''}
                    </span>
                    <span className="text-label-1 mb-1 mt-2.5 text-[#3d3d3d]">비밀번호</span>
                    <input
                        className={`border-1 mb-0.5 rounded-sm p-2 px-2.5 ${formState.errors.password ? 'border-red-600 placeholder-red-600 text-red-600' : 'border-[#888888] placeholder-[#888888]'
                            }`}
                        {...register('password')}
                        type="password"
                        placeholder="비밀번호"
                    />
                    <span className='text-red-600 text-sm'>
                        {formState.errors.password ? (
                            formState.errors.password?.message
                        ) : ''}
                    </span>
                    <span className="text-label-1 mb-1 mt-2.5 text-[#3d3d3d]">비밀번호 확인</span>
                    <input
                        className={`border-1 mb-0.5 rounded-sm p-2 px-2.5 ${formState.errors.passwordConfirm ? 'border-red-600 placeholder-red-600 text-red-600' : 'border-[#888888] placeholder-[#888888]'
                            }`}
                        {...register('passwordConfirm')}
                        type="password"
                        placeholder="비밀번호 확인"
                    />
                    <span className='text-red-600 text-sm'>
                        {formState.errors.passwordConfirm ? (
                            formState.errors.passwordConfirm?.message
                        ) : ''}
                    </span>
                    <span className="text-title-3 mt-[32px]">기본정보</span>
                    <span className="text-label-1 mb-1 mt-2.5 text-[#3d3d3d]">이름</span>
                    <input
                        className={`border-1 mb-0.5 rounded-sm p-2 px-2.5 ${formState.errors.name ? 'border-red-600 placeholder-red-600 text-red-600' : 'border-[#888888] placeholder-[#888888]'
                            }`}
                        {...register('name')}
                        type="text"
                        placeholder="김지니"
                    />
                    <span className='text-red-600 text-sm'>
                        {formState.errors.name ? (
                            formState.errors.name?.message
                        ) : ''}
                    </span>
                    <span className="text-label-1 mb-1 mt-2.5 text-[#3d3d3d]">학번</span>
                    <input
                        className={`border-1 mb-0.5 rounded-sm p-2 px-2.5 ${formState.errors.studentId ? 'border-red-600 placeholder-red-600 text-red-600' : 'border-[#888888] placeholder-[#888888]'
                            }`}
                        {...register('studentId')}
                        type="text"
                        placeholder="20235000"
                    />
                    <span className='text-red-600 text-sm'>
                        {formState.errors.studentId ? (
                            formState.errors.studentId?.message
                        ) : ''}
                    </span>
                    <span className="text-label-1 mb-1 mt-2.5 text-[#3d3d3d]">전화번호</span>
                    <input
                        className={`border-1 mb-0.5 rounded-sm p-2 px-2.5 ${formState.errors.phoneNumber ? 'border-red-600 placeholder-red-600 text-red-600' : 'border-[#888888] placeholder-[#888888]'
                            }`}
                        {...register('phoneNumber')}
                        type="phone"
                        placeholder="010-0000-0000"
                    />
                    <span className='text-red-600 text-sm'>
                        {formState.errors.phoneNumber ? (
                            formState.errors.phoneNumber?.message
                        ) : ''}
                    </span>
                </div>
                <div className="flex-grow"></div>
                <button type="submit" className={`p-2.5 text-white rounded-md mb-[24px] ${hasErrors ? "bg-[#888888]" : "bg-[#ff4500]"}`}>
                    다음으로
                </button>
            </div>
        </div>
    );
};
