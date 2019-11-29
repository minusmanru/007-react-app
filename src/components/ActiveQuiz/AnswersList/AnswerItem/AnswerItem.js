import React from 'react'
import classes from './AnswerItem.css'


const AnswerItem = props => {
    //console.log(props); 
    /*  получаем функцию onAnswerClickHandler из Quiz  вешаем на прослушку  onClick={() => props.onAnswerClick(props.answer.id)} 
        и передаём в неё параметр props.answer.id
    */
    const cls = [classes.AnswerItem]
    if (props.state) {
        cls.push(classes[props.state])
    }
    
    return ( 
        
        <li className={cls.join(' ')} 
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li> 
    )
}



export default AnswerItem