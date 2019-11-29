import React from 'react';
import classes from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList';

// блок с активным вопросом

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.answerNumber} из {props.quizlength}</small>
        </p>

        <AnswersList 
            answers={props.answers} 
            // функцию onAnswerClick передаём параметром onAnswerClick   в <ActiveList /> из Quiz 
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
)


export default ActiveQuiz