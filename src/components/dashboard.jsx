import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Cookies from 'universal-cookie';

/* Components */
import NavBar from './navBar';
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
        const userToSearchPost = 
        {
            user : cookies.get('username')
        }
        axios.get('http://localhost:1500/dashboard/')
        .then(res => 
            {
                const postsApi = res.data;
                this.setState({
                    posts : postsApi
                })
            }) 
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

    render() {
        return (
            <BrowserRouter>
             <Switch>
                <div>
                    <NavBar/>
                            <main>
                                <div className="">
                                    <Route  path='/dashboard/posts' component={Posts}/>
                                    <Route exact path='/users/:user' render={(props) => <Profile {...props}/>} />
                                </div>
                            </main>
                </div>
              </Switch>
            </BrowserRouter> 
        )
    }
}
