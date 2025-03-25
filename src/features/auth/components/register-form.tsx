import { useFormContext } from 'react-hook-form';

import { RegisterFormSchema } from '../hooks/use-register-form';

export const LoginForm = () => {
    const { register, formState } = useFormContext<RegisterFormSchema>();

    return (
        <div className="flex flex-col p-[20px]">
            <input
                {...register('email')}
                type="email"
                placeholder="gistory@gm.gist.ac.kr"
            />
            {formState.errors.email?.message}
            <input {...register('password')} type="password" placeholder="password" />
            {formState.errors.password?.message}

        </div>
    );
};
