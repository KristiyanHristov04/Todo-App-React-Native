import * as Yup from 'yup';

export const registerSchema = Yup.object({
    email: Yup.string()
        .email('Невалиден имейл адрес.')
        .required('Моля, въведете имейл.'),
    password: Yup.string()
        .min(8, 'Паролата трябва да е поне 8 символа.')
        .required('Моля, въведете парола.')
        .matches(/(?=.*[!@#$%^&*])/, 'Паролата трябва да съдържа поне един специален символ.')
        .matches(/(?=.*[0-9])/, 'Паролата трябва да съдържа поне една цифра.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Паролите не съвпадат.')
        .required('Моля, потвърдете паролата.')
});
