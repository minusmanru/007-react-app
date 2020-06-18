import React from 'react'
import classes from './Select.css'

const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`

    return (
        <div className={classes.Select}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
              id={htmlFor} 
              value={props.value} // значения по умолчанию
              onChange={props.onChange} // обработчик
            >
                {props.options.map((option, index) => {
                    return (
                        <option
                            value={option.value}
                            key={option.value + index}
                        >
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select