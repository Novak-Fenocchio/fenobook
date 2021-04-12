import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Cookies from 'universal-cookie';

/* Components */
import NavBar from './navBar';
import FormSignIn from './signIn';
import Post from './smallComponents/post';
import Cok from './cok';
import Posts from './posts';

import '../index.css';

const cookies = new Cookies();

export default class dashboard extends Component {

    constructor()
    {
        super();
        this.state = {
            posts : [],
            user : '',
            prebas: 'aaa'
        }
        this.handleCharge=this.handleCharge.bind(this);
    }

     getPosts = () =>
    {
        const userToSearchPost = 
        {
            user : cookies.get('username')
        }
        axios.post('http://localhost:1500/dashboard/user', userToSearchPost)
        .then(res => 
            {
                const postsApi = res.data;
                this.setState({
                    posts : postsApi
                })
            })
    } 

    renderPosts = () =>
    {
        this.getPosts();
       
        return this.state.posts.map(post => {
            return (
                <Post title={post.user} body={post.body}/>
                )
            })  
    }

    funcionaYUDA = (data ) =>
    {
        const postsRecividos = data;
        console.log(postsRecividos);
        this.setState({
            prebas : postsRecividos
        })
    }

    

    handleCharge =  (e) =>
    {
        e.preventDefault();
        const userToSignIn = {
            username : e.target.elements.username.value,
            password : e.target.elements.password.value
        }
        let ada = undefined;
        axios.post('http://localhost:1500/user/signIn/', userToSignIn )
     
        .then(res => { return res.data})
        .then(res => {
            if(res.length>0)
            {
                const respuesta = res[0];
                cookies.set('id', respuesta.id, {path : '/'});
                cookies.set('username', respuesta.username, {path : '/'});
                cookies.set('password', respuesta.password, {path : '/'});
                alert(`Welcome ${respuesta.username}, your password is ${respuesta.password}`)
                window.location.href = '/posts';
            }else{
                alert('User no found')
            }
        })
        .catch(err => console.log(err))

    }
  

    render() {
        return (
            <div>
              <NavBar/>
              <main>
                  <div className="">
                    {/* 
                      */}
{/*                         <input type="text" onChange={this.handleCharge} name='ida'/>
                        <button type='submit' onChange={this.handleCharge}> addd </button>
 */}

                  <BrowserRouter>
                    
                        <Switch>
                            <Route path='/login'>                    
                                <Cok dd='aaa' dale={this.handleCharge}/>
                                <FormSignIn dale={this.handleCharge}/>
                            </Route>
                            
                            <Route path='/posts'>
           
                                <Posts />
                           </Route>
                        
                        </Switch>

                    </BrowserRouter> 

                 </div>
              </main>
            </div>
        )
    }
}
