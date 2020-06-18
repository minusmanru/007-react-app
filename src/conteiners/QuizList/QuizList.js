import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import classes from './QuizList.css'
import Loader from './../../components/UI/Loader/Loader';
import axios from '../../axios/axios-quiz' // библиотека импортится не из 'axios', а из файлика axios-quiz
import {connect} from 'react-redux' // connect - функция подключающая компонент к стору
import {fetchQuizes} from '../../store/actions/quiz'

class QuizList extends Component {
    // state = {quizes: [],loading: true} // локальный стейт, заменен на стейт из redux

    renderQuizes() { // после подключение redux, обращаемся к props вместо - return this.state.quizes.map(quiz =>
        return this.props.quizes.map(quiz => { // this.props.quizes - получаем как параметр из mapStateToProps(state)
            return ( 
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id }>
                        {quiz.name}
                    </NavLink>
                </li> 
            )
        })
    }


    // обращение к серверу делаем в componentDidMount(), после того как произошел рендеринг дом дерева 
    // если функция описана как ES6 async пишем перед ней, если стрелочная пишем перед круглыми скобками
    componentDidMount() { // убераем - async componentDidMount(), оставляем только componentDidMount()
        this.props.fetchQuizes()
    }


   

    render() {
        return (
            <div className={classes.QuizList}>
                <div className={classes}>
                <h1>Список тестов</h1>
                { 
                    this.props.loading && this.props.quizes.length !== 0 // было до подключения redux, использовался локальный state - this.state.loading
                        ? <Loader /> 
                        : <ul>
                            { this.renderQuizes() }
                        </ul>
                }
                
                
                </div>
            </div>
        )
    }
} 

function mapStateToProps(state) { // 
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) { // 
    return { // здесь сообщаем компоненту что нужно загрузить набор тестов
        fetchQuizes: () => dispatch(fetchQuizes()) // fetchQuizes: - диспатчит новый action Creator - fetchQuizes
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
