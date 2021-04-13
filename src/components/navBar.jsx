import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter, Switch, Route, Link, Router} from 'react-router-dom';

import Cookies from 'universal-cookie';
const cookies = new Cookies();


export default class navBar extends Component {

    logOut = () =>
    {
        cookies.remove('username', {path : '/'})
        window.location.href = '/dashboard/login'
    }

    searchUser = (e) =>
    {
        e.preventDefault();
        const userToSearch = e.target.elements.username.value;
        window.location.href = `/users/${userToSearch}`;
    }

    render() {
        return (
            <nav className='navMain'>

                <div className="navTitle">
                  <span>feno<strong>Book</strong></span>
                </div>
                
                <div className="navSearch">
                    <form action="" onSubmit={this.searchUser}>

                    <div class="input-group inputNavSearch">
                        <div class="input-group-prepend">
                            <button class="btn btn-outline-secondary" type="submit">Buscar</button>
                        </div>
                        <input type="text" class="form-control" name='username' placeholder="Buscar un usuario..." aria-label="" aria-describedby="basic-addon1"></input>
                    </div>
                    </form>
                </div>

                <div className="navItems">
                    <Link to="/posts"><span>Inicio</span></Link>
                    <Link to='/perfil'><span>Perfil</span></Link>
                    <span onClick={this.logOut}><FontAwesomeIcon icon={faSignOutAlt} /></span>    
                </div>
            </nav>
        )
    }
}
