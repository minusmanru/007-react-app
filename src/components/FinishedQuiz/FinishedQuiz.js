import React from 'react'
import classes from './FinishedQuiz.css'

const FinishedQuiz = props => {
    // Object.keys() - превращает объект в массив ключей этого объекта. 
    // для подсчёта массива метод reduce(() => {}, 0) первым параметром передаём к.б. функцию, вторым начальное значение с которого считать
    // первым параметром в reduce(()  передаём total - будет увеличиваться с кажд. итерацией и key - текущую переменную
    const successCount = Object.keys(props.results).reduce((total, key) => {
       if (props.results[key] === 'success') { // если results по ключу [key] === 'success', то увеличиваем  total++, который виден на всей итерации
            total++
       } 
       return total                                                                        
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <h3>Ваш результат:</h3>
            
            <ul>
                { props.quiz.map((quizItem, index) => {
                    console.log(index, 'index');
                    
                    const cls = [
                        'fa',
                        props.results[index] === 'error' ? 'fa-times ' + classes.error : 'fa-check ' + classes.success  // -  Это работает!
                        // props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        // classes[props.results[quizItem.id]]
                    ]
                    return (
                        <li key={index}>
                        <strong>{index + 1}</strong>.&nbsp;
                            {props.quiz[index].question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                }) }
                
            </ul>
            <p className={''}>
            <strong>Правильно {successCount} из {props.quiz.length}</strong>
                
            </p>
            <div className={''}>
                <button onClick={() => props.toStart()}>Попробовать заново</button>
            </div>
        </div>
    )
}
    


export default FinishedQuiz