export const validatePhoneFormat = (phoneNumber: string): boolean => /^(\+2519\d{8}|09\d{8}|\+2517\d{8}|07\d{8})$/.test(phoneNumber)

