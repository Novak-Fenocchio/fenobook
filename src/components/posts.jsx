import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

import Post from './smallComponents/post';
import FormPoster from './formPoster';

const cookies = new Cookies();


export default class posts extends Component {

    constructor()
    {
        super();
        this.state ={
            posts : []
        }
    }

    componentDidMount()
    {
        const userToSearchPost = 
        {
            user : cookies.get('username')
        }
   /*      axios.post('http://localhost:1500/dashboard/user', userToSearchPost)
        .then(res => 
            {
                const postsApi = res.data;
                this.setState({
                    posts : postsApi
                })
            }) */
    }
    renderPosts = () =>
    {
        return this.state.posts.map(post => {
            return (
                <Post user={post.user} body={post.body}/>
                )
            })  
    }

    addPost = (e) =>
    {   
        e.preventDefault();
        const newPost = {
            body: e.target.elements.body.value,
            user: cookies.get('username')
        }
        axios.post('http://localhost:1500/dashboard/add', newPost)
        .then(window.location.href='/posts')
        .catch(err => console.log(err)) 
        

    }   

    render() {
        return (
            <div className='containerPosts'>
                <FormPoster  addPost={this.addPost}/>
                 <h3 className='headerwelcome'>Bienvenido, <strong>{cookies.get('username')}</strong></h3>
                   {this.renderPosts()}
            </div>
        )
    }
}
