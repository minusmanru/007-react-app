import React, {Component} from 'react';
import classes from './QuizCreator.css'
import Button from './../../components/UI/Button/Button';
import { createControl, validate, validateForm } from './../../form/formFramework';
import Input from './../../components/UI/Input/Input';
import Select from './../../components/UI/Select/Select';
import axios from '../../axios/axios-quiz' // в прописан базовый урл - axios.get('https://react-app-e12a9.firebaseio.com/quizes.json')
// axios библа для работы с ajax запросами и сервером
import { connect } from 'react-redux';



function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMassage: 'Значение не может быть пустым',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({ // createControl - возвращает объект, вызываем её с передачей в неё параметров
            label: 'Введите вопрос',
            errorMassage: 'Вопрос не может быть пустым'
        }, {required: true}), 
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)

    }
}

class QuizCreator extends Component {

    state = {
        // при добавлении нового вопроса, нужно обнулить formControls:
        // quiz: [], // все вопросы в массиве quiz: [], при добавлении нового вопроса, он попадет в этот массив
        formControls: createFormControls(),
        isFormValid: false,
        rightAnswerId: 1
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const quiz = this.props.quiz.concat() // вернёт копию массива
        const index = quiz.length + 1 // используется для idшника
        
        const { question, option1, option2, option3, option4 } = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        quiz.push(questionItem)

        this.setState({
            quiz,
            formControls: createFormControls(),
            isFormValid: false,
            rightAnswerId: 1
        })

    }

    // если функция описана как стрелочноя, async пишем перед скобочками или параметром - createQuizHandler = async () => 
    createQuizHandler = async event => {
        event.preventDefault()
        // await распарсит промис который вернёт - axios.post 
        try { 
            await axios.post('/quizes.json', this.state.quiz) // передаем массив this.state.quiz из стейта 
            this.setState({ // обнуляем стейт
                quiz: [],
                formControls: createFormControls(),
                isFormValid: false,
                rightAnswerId: 1
            })
        } catch (e) {
            console.log(e)
        }
    }

    // createQuizHandler = event => {
    //     event.preventDefault()

    //     axios.post('https://react-app-e12a9.firebaseio.com/quizes.json', this.state.quiz)
    //         // axios вернёт промис поэтому используем  .then  
    //         .then(response => {
    //             console.log(response);
    //         })
    //         .catch(error => console.log(error)
    //     )
        
    // }


    


    сhangeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
        control.value = value
        control.touched = true
        control.valid = validate(control.value, control.validation)
        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

    } 

    renderControls() { // метод зависит от state
        // из this.state.formControls, получим набор ключей - option1, option2 и т.д.
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName] // в const control, попадает объект - option1, option2.. либо question:

            return (
                <React.Fragment key={controlName + index}>
                    <Input
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation} 
                    // shouldValidate - нужно валидировать инпут, или нет. 
                    // можно передать true, или привести к булеан validation - !!control.validation
                    onChange={event => this.сhangeHandler(event.target.value, controlName)}
                    />

                    { index === 0 ? <hr/> : null }
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = event => {
        //console.log(event.target.value);
        this.setState({     // меняем стайт селекта - правильного ответа
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>

                        { this.renderControls() }
                        
                        { select }
                        
                        <Button 
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid} //если форма не валидна, кнопка - disabled
                        >Добавить вопрос</Button>

                        <Button 
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0} //если нет вопросов, кнопка - disabled
                        >Создать тест</Button>
                    </form>
                </div>
            </div>
        )
    }
} 


function mapStateToProps(state) {
    return {
        quiz: state.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)