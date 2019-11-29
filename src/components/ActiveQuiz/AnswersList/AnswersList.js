import React from 'react'
import classes from './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem';



// компонент списка вопросов
const AnswersList = props => (
    <ul className={classes.AnswersList}>
        { props.answers.map((answer, index) => {
            return (
                <AnswerItem 
                    answer={answer} 
                    key={index} 
                    // функцию onAnswerClick передаём параметром onAnswerClick   в <ActiveItem /> из Quiz  через <ActiveQuiz и <ActiveList /> 
                    onAnswerClick={props.onAnswerClick}
                    state={props.state ? props.state[answer.id] : null}
                />
            )
        }) }
        
    </ul>
)


export default AnswersList