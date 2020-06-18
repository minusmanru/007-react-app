export function createControl(config, validation) { // принимает конфигурации и набор правил валидации
    return { // возвращаем новый объект
        ...config, // разворачиваем обект конфигурации
        validation,
        // valid: принимает отрицание от объекта validation, т.е. если мы получили набор правил валидации - начальное значеие valid: false
        // т.к. есть набор правил, и изначальное состояние - не валидно!
        valid: !validation,
        touched: false,
        value: ''
    }
}

export function validate(value, validation = null) {
    if(!validation) {
        return true
    }

    let isValid = true

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }


    return isValid
}

export function validateForm(formControls) {
    let isFormValid = true

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    return isFormValid
}