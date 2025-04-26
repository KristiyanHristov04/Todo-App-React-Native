import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string()
        .email('Невалиден имейл адрес.')
        .required('Моля, въведете имейл.'),
    password: Yup.string()
        .min(6, 'Паролата трябва да е поне 6 символа.')
        .required('Моля, въведете парола.')
});
