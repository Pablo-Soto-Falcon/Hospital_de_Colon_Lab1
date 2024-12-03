export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

export function validatePhone(phone) {
    const telefonoRegex = /^[0-9]+$/;
    return telefonoRegex.test(phone);
}

export function validateFields(...fields) {
    return fields.every(field => field.trim() !== "");
}


