import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const signIn = (props) =>
{
     /* Login  */
     function signIn(e) 
     {
         e.preventDefault();
      
         const userToSignIn = {
             username : e.target.elements.username.value,
             password : e.target.elements.password.value
         }
         axios.post('http://localhost:1500/user/signIn/', userToSignIn )
      
         .then(res => { 
            console.log(res.data);     
            return res.data
        })
         .then(res => {
             if(res.length>0)
             {
                 const respuesta = res[0];
                 cookies.set('id', respuesta._id, {path : '/'});
                 cookies.set('username', respuesta.username, {path : '/'});
                 cookies.set('avatar', respuesta.avatar, {path : '/'});
                  window.location.href = '/dashboard/posts';
             }else{
                 alert('User no found')
             }
         })
         .catch(err => console.log(err))
 
     }


    return(
        <div className='container-sign'>
        <div className="logForm">
            <form onSubmit={signIn} method="post">
                <h3>Iniciar sesión</h3>
                <input type="text" name="username" placeholder='Nombre de usuario' autoComplete='off' id=""/> <br/>
                <input type="password" name="password" placeholder='Contraseña' autoComplete='off' id=""/> <br/>
                <button type='submit'>Entrar</button> <br/>
                <span className='alreadyHaveAccount'>No tienes cuenta? <a href="/signUp">Registrate</a></span>
            </form>
        </div>
        <div className="formImage">
            <div className="">
                <h1>feno<span>book</span></h1>
            </div>
        </div>
        </div>


       );
    }
export default signIn