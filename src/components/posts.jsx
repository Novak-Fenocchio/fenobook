import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

import Post from './smallComponents/post';
import FormPoster from './formPoster';
import Alert from './smallComponents/alert';

const cookies = new Cookies();


export default class posts extends Component {

    constructor()
    {
        super();
        this.state ={
            posts : [],
            images : [
                'https://image.flaticon.com/icons/png/128/2922/2922510.png',
                'https://image.flaticon.com/icons/png/128/2922/2922515.png',
                'https://image.flaticon.com/icons/png/128/2922/2922565.png',
                'https://image.flaticon.com/icons/png/128/2922/2922656.png',
                'https://image.flaticon.com/icons/png/128/2922/2922715.png',
                'https://image.flaticon.com/icons/png/128/2922/2922546.png',
                'https://image.flaticon.com/icons/png/128/2922/2922532.png',
                'https://image.flaticon.com/icons/png/128/2922/2922522.png',
                'https://image.flaticon.com/icons/png/128/2922/2922575.png',
                'https://image.flaticon.com/icons/png/128/2922/2922624.png',
                'https://image.flaticon.com/icons/png/128/2922/2922671.png'
            ],
            avatarOfPost: '',
            haveAvatar: false
            }
    }

    componentDidMount()
    {
      axios.get('http://localhost:1500/dashboard')
        .then(res => 
            {
                const postsApi = res.data;
                this.setState({
                    posts : postsApi

                })
            }) 
            .catch(err => console.log(err))

            const prueba = cookies.get('avatar')
     
            if(prueba == 'undefined')
         {
            this.setState({
                haveAvatar: false
            })
         }else
         {
            this.setState({
                haveAvatar: true
            })
         }

    }

    renderPosts = () =>
    {
        return this.state.posts.map(post => {
            let datePost =  post.createdAt.slice(0,10);

            const usersLikes = post.likesUsers;
            let likeOrDont = usersLikes.includes(cookies.get('username'))

            return (
                <Post 
                    type='usersLikes'
                    user={post.user} 
                    body={post.body} 
                    avatar={post.avatarUser -1} 
                    idPost={post._id} date={datePost} 
                    likes={post.likes} liked={likeOrDont} 
                    usersLikes={usersLikes}/>
                )
            })  
    }

    addPost = (e) =>
    {   
        e.preventDefault();
        const newPost = {
            body: e.target.elements.body.value,
            user: cookies.get('username'),
            avatarUser: cookies.get('avatar')
        }
        console.log(newPost);
        axios.post('http://localhost:1500/dashboard/add', newPost)
        .then(window.location.href='/dashboard/posts')
        .catch(err => console.log(err)) 
        
    }   

    

    render() {
        return (
            <div className='containerPosts '>
                <FormPoster  addPost={this.addPost}/>

                {/* Advise of select avatar */}
                {this.state.haveAvatar == false &&
                <div className="">
                    <Alert />
                </div>
                }
    
                 <h3 className='headerwelcome'>Bienvenido, <strong>{cookies.get('username')}</strong></h3>
                   {this.renderPosts()}
            </div>
        )
    }
}
