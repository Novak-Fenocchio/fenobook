import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


export default class navBar extends Component {
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
                    <span><FontAwesomeIcon icon={faSignOutAlt} /></span>    
                </div>

            </nav>
        )
    }
}
