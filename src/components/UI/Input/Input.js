import React from 'react'
import classes from './Input.css'

// через деструктуризацию забераем параметры valid, touched, shouldValidate
// valid - определяется при валидации формы, проверяет валиделн ли контрол
// touched - если потрогали, 
// shouldValidate - булеан. если должны валидировать
// эти параметры сгенерир.ны самостоятельно и переданны в форму 
function inInvalid({valid, touched, shouldValidate}) { 
    //console.log(`valid:${valid}  touched:${touched} shouldValidate:${shouldValidate}`);
    
    return !valid && shouldValidate && touched 
}

const Input = props => {
    const inputType = props.type || 'text' // определяем тип инпута
    const cls = [classes.Input]
    const hmlFor = `${inputType} -${Math.random()}` // генерим уникальный hmlFor для каждого инпуита

    if (inInvalid(props)) { // проверка на валидность. В случае если функция inInvalid(props) вернет true. Добавляем класс
        cls.push(classes.invalid)
    }



    return (
        <div className={cls.join(' ')}>
            {/* в jsx атрибут for заменяется на htmlFor */}
            <label htmlFor={hmlFor}>{props.label}</label>
            <input 
                // type={inputType} - определяет свойство инпута - текст номер и т.д.
                type={inputType}
                id={hmlFor}
                value={props.value}
                onChange={props.onChange} // прослушка изменений в инпуте
            />

            {
                inInvalid(props) ? <span>{props.errorMassage || 'Введите верное значение'}</span> : null
            }
            
        </div>

    )
}


export default Input