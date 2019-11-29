import React from 'react'
import classes from './FinishedQuiz.css'

const FinishedQuiz = props => {
    return (
        <div className={classes.FinishedQuiz}>
            <h3>Ваш результат:</h3>
            
            <ul>
                { props.quiz.map((quizItem, index) => {
                    console.log(quizItem, index);
                    
                    const cls = [
                        'fa',
                        //props.results[index] === 'error' ? 'fa-times ' + classes.error : 'fa-check ' + classes.success  // -  Это работает!
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]
                    return (
                        <li key={index}>
                        <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                }) }


                {/* <li>
                    <strong>1.</strong>&nbsp;
                    Name
                    <i className={'fa fa-times ' + classes.error} />
                </li> 
                <li>
                    <strong>2.</strong>&nbsp;
                    Name
                    <i className={'fa fa-check ' + classes.success} />
                </li> */}

            </ul>
            <p className={''}>
            <strong>Правильно 4 из 10</strong>
                
            </p>
            <div className={''}>
                <button onClick={() => props.toStart()}>Попробовать заново</button>
            </div>
        </div>
    )
}
    


export default FinishedQuiz