import axios from 'axios';
import React, { Component } from 'react'
import background from '../assets/backgroundLogin.jpg';


export default class signUp extends Component {

    registerUser = (e) =>
    {
        e.preventDefault();

        const {username, password} = e.target.elements;

        const newUser = ({
            username: username.value,
            password: password.value
        })

        axios.post('http://localhost:1500/user/signUp', newUser)
        .then(() => alert('SUCCESSFULLY'))
        .then(() => window.location.href='dashboard/posts')
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='container-sign'>
                <div className="logForm">
                    <form onSubmit={this.registerUser} method="post">
                        <h3>Registrarse</h3>
                        <input type="text" name="username" placeholder='Nombre de usuario' autoComplete='off' id=""/> <br/>
                        <input type="password" name="password" placeholder='Contraseña' autoComplete='off' id=""/> <br/>
                        <input type="password" name="repeatpassword" placeholder='Repetir contraseña' autoComplete='off' id=""/> <br/>
                        <button type='submit'>Entrar</button> <br/>
                        <span className='alreadyHaveAccount'>Ya tienes cuenta? <a href="">Inicia sesion</a></span>
                    </form>
                </div>
                <div className="formImage">
                    <div className="">
                        <h1>feno<span>book</span></h1>
                    </div>
                </div>
            </div>
        )
    }
}
