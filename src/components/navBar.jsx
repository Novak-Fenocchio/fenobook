import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export default class navBar extends Component {

    logOut = () =>
    {
        cookies.remove('username', {path : '/'})
        window.location.href = '/login'
    }

    render() {
        return (
            <nav className='navMain'>

                <div className="navTitle">
                  <span>feno<strong>Book</strong></span>
                </div>
                
                <div className="navSearch">
                    <div className="input-group inputNavSearch">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Buscar un usuario..." aria-label="Username" aria-describedby="basic-addon1"></input>
                    </div>  
                </div>

                <div className="navItems">
                    <span>Inicio</span>
                    <span>Perfil</span>
                    <span onClick={this.logOut}><FontAwesomeIcon icon={faSignOutAlt} /></span>    
                </div>

            </nav>
        )
    }
}
