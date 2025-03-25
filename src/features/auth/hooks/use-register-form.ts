import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { register } from '../services/use-register';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    name: z.string().min(1),
    studentId: z.string().min(1),
    phoneNumber: z.string().min(1),
    verificationJwtToken: z.string().min(1),
});

export type RegisterFormSchema = z.infer<typeof schema>;

export const useRegisterForm = () => {
    const form = useForm({
        resolver: zodResolver(schema),
        mode: 'onBlur',
    });

    const onSubmit = form.handleSubmit((data) => {
        register(data);
    });

    return { form, onSubmit };
};
