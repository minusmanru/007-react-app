import React, {Component} from 'react'
import classes from './Layout.css'


/* весь контент попадающий в Layout, будет выводится в <main> */
/* в Layout корневой <div> приложения */

class Layout extends Component { 
    render() {
        return (
            <div className={classes.Layout}> 
                <main>
                    { this.props.children }
                </main>
            </div>
        )
    }
}

export default Layout
