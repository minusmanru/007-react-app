import React, {Component} from 'react'


/* весь контент попадающий в Layout, будет выводится в <main> */
/* в Layout корневой <div> приложения */

class Layout extends Component { 
    render() {
        return (
            <div> 
                <main>
                    { this.props.children }
                </main>
            </div>
        )
    }
}

export default Layout
