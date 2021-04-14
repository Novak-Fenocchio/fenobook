import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUpLine} from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';

import Cookies from 'universal-cookie';

import Modal from './modal'

const cookies = new Cookies();

export default class post extends Component {
    constructor(props)
    {
        super();
        this.state = {
            avatar : [
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
            like: false,
            likeAmount: props.likes,
            likesUsers: props.usersLikes
        }
        this.like = this.like.bind(this);

    }

    like = (e) =>
    {
        e.preventDefault();

        const { like } = this.state
        this.setState({
            like : !like
        })

        const idPost = e.target.elements.post.value;
        const postToLike = {
            idMessage : idPost,
            id: idPost,
            username: cookies.get('username')
        }
        if(this.state.like == true)
        {
            axios.post('http://localhost:1500/dashboard/dislike', postToLike)
            .then(()=> {
              this.setState({
                  likeAmount: this.state.likeAmount -1
              })
            })
        }else
        {
            axios.post('http://localhost:1500/dashboard/like', postToLike)
            .then(()=> {
                this.setState({
                    likeAmount: this.state.likeAmount +1
                })
              })
        }
    }

    componentDidMount()
    {
        this.setState({
            like: this.props.liked
        })
    }

    render(props) {

        return (
            <div className='post'> 
            
            <div className="postHeader">
                <img width='100%' src={this.state.avatar[this.props.avatar]} alt=""/>  
                <div className="postHeaderText">
                    <h3>{this.props.user}</h3>
                    <div className='postDate'>{this.props.date}</div>
                </div>
            </div>
                <p> 
                    {this.props.body}
                </p>
                <div className="postAction">
                    {this.state.like &&
                        <form onSubmit={this.like}>

                            <input type="hidden" name='post' value={this.props.idPost}/>
                          
                          <button type="submit" className='buttonLike'>
                            <span className='meGusta' >
                                <span>
                                    <span className='likeAmount'>{this.state.likeAmount}</span>
                                    
                                    <div className="imageThumbsUp">
                                    <FontAwesomeIcon icon={faThumbsUp}  />
                                    </div>

                                    </span>
                                    Ya no me gusta 
                            </span>
                            </button>
                       
                        </form>
                    }
                    {
                        this.state.like == false &&   
                        <form onSubmit={this.like}>
                                <input type="hidden" name='post' value={this.props.idPost}/>
                            
                            <button type="submit" className='buttonLike'>
                                <span className='meGusta' >
                                    <span>
                                        <span className='likeAmount'>{this.props.likes}</span>
                                            <div className="imageThumbsUp">
                                            <FontAwesomeIcon icon={faThumbsUpLine}  />
                                            </div>
                                        </span>Me gusta 
                                </span>
                            </button>

                        </form>
                    }

                    <Modal button='Ver likes' type={this.props.type} array={this.state.likesUsers} buttonClass='btnWhite btnVerLikes' title='Lista de likes' message='' cancel='Cerrar' accept='Aceptar'/>

                </div>
            </div>
        )
    }
}