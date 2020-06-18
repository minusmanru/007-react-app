import React from 'react';
import classes from './BackDrop.css'

// затемнение экрана при открытом меню и закрытие меню нажатием на BackDrop 
// подключается из Drawer - this.props.isOpen ? <BackDrop onDrop={this.props.onDrop} /> : null 
// при нажатии на BackDrop, вызывается метод onDrop={this.toggleMenuHendler} из Layout, который передается Drawer_(ом)

const BackDrop = props => <div className={classes.BackDrop} onClick={props.onDrop}/>

export default BackDrop