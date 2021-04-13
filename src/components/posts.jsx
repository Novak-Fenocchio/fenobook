import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

import Post from './smallComponents/post';
import FormPoster from './formPoster';
import logo from '../assets/png/001-man.png'

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
            ]
            }
    }

    componentDidMount()
    {
        const userToSearchPost = 
        {
            user : cookies.get('username')
        }
      axios.get('http://localhost:1500/dashboard')
        .then(res => 
            {
                const postsApi = res.data;
                this.setState({
                    posts : postsApi
                })
            }) 
            .catch(err => console.log(err))
    }
    renderPosts = () =>
    {

        return this.state.posts.map(post => {
            let datePost =  post.createdAt.slice(0,10);
            return (
                <Post user={post.user} body={post.body} avatar={'1'} date={datePost}/>
                )
            })  
    }

    renderImages = () =>
    {
        const imagesAvatar = this.state.images;
            console.log(imagesAvatar.length);
        return this.state.images.map(image => {
            return (
                <img src={image} alt=""/> 
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

    importAll = (r) => {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    render() {
        return (
            <div className='containerPosts'>
                <FormPoster  addPost={this.addPost}/>
                 <h3 className='headerwelcome'>Bienvenido, <strong>{cookies.get('username')}</strong></h3>

               {/*   <div className="container-avatars">
                  {this.renderImages()}
                </div>  */}

                   {this.renderPosts()}
            </div>
        )
    }
}
