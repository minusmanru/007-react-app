import React, {Component} from 'react';
import classes from './Auth.css'
import Button from './../../components/UI/Button/Button';
import Input from './../../components/UI/Input/Input';
//import is from 'is_js'
import axios from 'axios'

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {

    state = { // стейт - переменная - объект в корне класса
        isFormValid: false, // для валидации всей формы
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMassage: 'Введите корректный email',
                valid: false, 
                // Поле валидации контрола в значении - false, что бы не выдавалась ошибка сразу, т.к. строка по дефолту пуста, 
                // а только после того как введут не то значение, и для этого исползуем - touched: false
                touched: false, // если тронули поле, будет true
                validation: { // правила валидации контрола 
                    required: true, // обязательное поле
                    email: true // должен быть введен email
                }

            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMassage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6 // минимальная длина пароля для FB - 6
                }    
            }
        }
    }



    loginHandler = async () => { // 
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDJdg8fw0_-Gxiy2mzq7NSy07pyFZEP8U', authData)
            console.log(response.data);
        } catch (e) {
            console.log(e)
            
        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDJdg8fw0_-Gxiy2mzq7NSy07pyFZEP8U', authData)
            
            console.log(response.data);
            
        } catch (e) {
            console.log(e)
            
        }
    }

    onSubmitHandltr = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        //console.log('value, validation', value, validation);
        console.log('validation', validation.required);
        if (!validation) { // если не передали параметры, то валидировать конторлы не нужно.
            return true
        }

        let isValid = true 


        //  lj,fdkztv && isValid, для проверки - если value.trim() !== '' -  тру, но до этого  && isValid уже была false 
        if (validation.required) { // валидация обязательного поля
            // что бы проверить есть ли что в строке, переопределяем isValid на value и методом .trim() убераем пробелы
           // и если это не равно пустой строке 
            isValid = value.trim() !== '' && isValid  
            //  && isValid здесь - в первом условии это не совсем нужно. было в примере, но по ходу не нужно.
        }

        if (validation.email) { // валидация поля email
            isValid = validateEmail(value) && isValid // && isValid - если на первой проверке isValid - false
        }

        if (validation.minLength) { // валидация минимальной длины
            return isValid = value.length >= validation.minLength && isValid
        }

        return isValid

    }

    onChangeHandler = (event, controlName) => {
        //console.log(controlName, event.target.value);
        const formControls = { ...this.state.formControls } // стпредом получаем копию стейта this.state.formControls
        const control = { ...formControls[controlName] } 
       
        
        control.value = event.target.value
        control.touched = true // метод onChangeHandler срабатывае как только пользователь ввёл данные, по этому, touched ставим в значение true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control // записываем в formControls уже изменённый объект password(а) и email(а)

        let isFormValid = true
         // Object.keys(formControls) - проходим по всем объектам объекта formControls и получив ключи email: или password:,  
        // оператором .forEach на каждой итерации переопределяем  let isFormValid 
        Object.keys(formControls).forEach(name => { 
            // если у formControls[по ключу email: или password:] поле .valid - true, то isFormValid = true
            isFormValid = formControls[name].valid && isFormValid
        })


        this.setState({
            formControls, isFormValid
        })
    }

    // renderInputs() - функция вернёт массив состоящий из инпутов. В const control получим массив из объекта this.state.formControls
    // Object получит ключи объекта state.formControls - массив из password: и email:
    // затем с помощью оператора map(() из полученного масиива, получим controlName и index
    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName] 
            // в const control записываем обект из email: или password: который будет содержать в себе: type  value touched label    и т.дд

            //console.log('!!control.validation', !!control.validation);
            
           return (
               // по итогам прохождения объекта this.state.formControls, будут сформированы два JSX инпута которые попадут в форму
            <Input 
                key={controlName + index}
                type={control.type}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                label={control.label}
                errorMessage={control.errorMessage}
                shouldValidate={!!control.validation} 
                // shouldValidate - нужно валидировать инпут, или нет. 
                // можно передать true - shouldValidate={true}, или привести к булеан control.validation - !!control.validation
                onChange={event => this.onChangeHandler(event, controlName)}
            />
           )
        //    вместо того чтобы в этом месте писать return inputs, пишем return возле Object.keys вместо const inputs = Object.keys(this.state.formControls)
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    {/* Метод onSubmitHandltr отменяет стандартное поведение формы - event.preventDefault()*/}
                    <form onSubmit={this.onSubmitHandltr} className={classes.AuthForm}>
                        {/* Вызов Функции - this.renderInputs() - рендерит инпуты */}
                        { this.renderInputs() }

                        <Button type="success" onClick={this.loginHandler}
                            disabled={!this.state.isFormValid} // если форма не валидная disabled - true
                        >Войти</Button>
                        <Button type="primary" onClick={this.registerHandler}
                            disabled={!this.state.isFormValid} // если форма не валидная disabled - true
                        >Зарегистрироватся</Button>
                    </form>
                </div>
            </div>
        ) 
    }
}  