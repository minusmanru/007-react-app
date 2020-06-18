import React, {Component} from 'react'
import classes from './Layout.css'
import MenuToggle from './../../components/Navigation/MenuToggle/MenuToggle' // кнопка меню
import Drawer from './../../components/Navigation/Drawer/Drawer' // компонент - список ссылок навигации
/* весь контент попадающий в Layout, будет выводится в <main> */
/* в Layout корневой <div> приложения */

class Layout extends Component { 

    state={
        menu: false
    }

    toggleMenuHendler = () => { // меняем стейт - показать или скрыть меню
        this.setState({
            menu: !this.state.menu
        })
    }

    onClick = () => {
        this.setState({
            menu: !this.state.menu
        })
    }



    render() {
        return (
            <div className={classes.Layout}> 
                
                <Drawer isOpen={this.state.menu} onDrop={this.toggleMenuHendler}/>
                <MenuToggle 
                    
                    onToggle={this.toggleMenuHendler}
                    isOpen={this.state.menu}
                />
                <main>
                    { this.props.children }
                </main>
            </div>
        )
    }
}

export default Layout
