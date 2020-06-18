import React from 'react'
import classes from './FinishedQuiz.css'
import Button from './../UI/Button/Button';
import {Link} from 'react-router-dom' 
// link не содержит в себе параметров - activLink классов и т.д, а просто оборачивает компонент, осуществляя навигацию с меньшим функционалом

const FinishedQuiz = props => {
    // Object.keys() - превращает объект в массив ключей этого объекта. 
    // для подсчёта ответов находящихся в массиве results, используем метод reduce(() => {}, 0) первым параметром передаём к.б. функцию, 
    //вторым начальное значение с которого считать
    // первым параметром в reduce(()  передаём total++ - которая будет увеличиваться с каждой итерацией, и key - текущую переменную
    // если results по ключу [key] === 'success', то увеличивается total++, который виден на всей итерации
    
    const successCount = Object.keys(props.results).reduce((total, key) => { // считаем правильные ответы из state - results
       if (props.results[key] === 'success') { 
            total++
       } 
       return total                                                                        
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <h3>Ваш результат:</h3>
            
            <ul>
                { props.quiz.map((quizItem, index) => {
                    //console.log(index, 'index');
                    
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
                {/* Попробовать заново - </Button> вызывает - toStart = () => { в файле Quiz */}
                <Button onClick={() => props.toStart()} type="primary" >Попробовать заново</Button> 
                <Link to={'/'}>
                    <Button  type="success" >Перейти в список тестов</Button>
                </Link>
                {/* <button onClick={() => props.toStart()}>Попробовать заново</button> */}
            </div>
        </div>
    )
}
    


export default FinishedQuiz