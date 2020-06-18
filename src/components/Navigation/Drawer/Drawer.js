// компонент навигации  
import React, {Component} from 'react';
import classes from './Drawer.css'
import BackDrop from './../../UI/BackDrop/BackDrop' // затемнение экрана пи открытом меню. Оно же, работает как кнопка закрытия меню.
import { NavLink } from 'react-router-dom' // делает переход между страницами без перезагрузки

const links = [
    {to: '/', label: 'Список', exact: true}, // в объекте указан путь - to: '/',  название - label: 'Список', и параметр exact - точное совпадение пути
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-creator', label: 'Создать тест', exact: false}
    ]

class Drawer extends Component {

    renderLinks() {
        return links.map((link, index) => { // .map пробегается по массиву links. и генерирует из ниъ теги li
            return (
                // выводим список ссылок навигации
                
                <li key={index}>
                    {/* шаблон ссылки <NavLink 
                        onClick={this.props.onDrop} - закрытие меню после нажатия на ссылку
                    */}
                    <NavLink 
                    exact={link.exact} 
                    to={link.to} 
                    activeClassName={classes.active}
                    onClick={this.props.onDrop} 
                    >
                        {link.label}    
                    </NavLink> 
                </li>
            )
        })
    }

    render() {

        const cls = [classes.Drawer]
        if (!this.props.isOpen) { // если меню закрыто, то в массив cls, пушим стиль CSS - close. cls.push(classes.close)
            cls.push(classes.close)
        }

        return (
            <React.Fragment >
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks() }
                    </ul>
                </nav>
                {/* параметр isOpen передает стейт {this.state.menu} из layout который true, то показываем <BackDrop */}
                {/* передаем в BackDrop метод - onDrop, который поменяет стейт в Layout методом toggleMenuHendler, и закроет меню */}
                { this.props.isOpen ? <BackDrop onDrop={this.props.onDrop} /> : null }
            </React.Fragment>
        )
    }
}

export default Drawer

