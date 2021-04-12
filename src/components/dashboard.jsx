import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Cookies from 'universal-cookie';

/* Components */
import NavBar from './navBar';
import FormSignIn from './signIn';
import Post from './smallComponents/post';
import Posts from './posts';
import Profile from './profile';

import '../index.css';

const cookies = new Cookies();

export default class dashboard extends Component {

    constructor()
    {
        super();
        this.state = {
            posts : [],
            user : ''
        }
    }

    /* Get post by user */
     getPostsByUser = () =>
    {
     /*    const userToSearchPost = 
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
            }) */
    } 

    /* Generate the posts */
    renderPosts = () =>
    {
        this.getPostsByUser();
       
        return this.state.posts.map(post => {
            return (
                <Post title={post.user} body={post.body}/>
                )
            })  
    }

    /* Login  */
    signIn =  (e) =>
    {
        e.preventDefault();
        const userToSignIn = {
            username : e.target.elements.username.value,
            password : e.target.elements.password.value
        }
        axios.post('http://localhost:1500/user/signIn/', userToSignIn )
     
        .then(res => { return res.data})
        .then(res => {
            if(res.length>0)
            {
                const respuesta = res[0];
                cookies.set('id', respuesta.id, {path : '/'});
                cookies.set('username', respuesta.username, {path : '/'});
                window.location.href = '/posts';
            }else{
                alert('User no found')
            }
        })
        .catch(err => console.log(err))

    }
  

    render() {
        return (
            <BrowserRouter>
             <Switch>
                <div>
                    <NavBar/>
                            <main>
                                <div className="">
                                    <Route exact path="/login">                    
                                        <FormSignIn signIn={this.signIn}/>
                                    </Route>

                                    <Route exact path='/posts' component={Posts}/>
                                    <Route exact path='/users/:user' render={(props) => <Profile {...props}/>} />
                                    
                                </div>
                            </main>
                </div>
              </Switch>
            </BrowserRouter> 
        )
    }
}
