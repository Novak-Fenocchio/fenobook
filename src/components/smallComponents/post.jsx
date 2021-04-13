import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'


export default class post extends Component {
    constructor()
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
            ]
        }
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
                  <span className='meGusta'><span><FontAwesomeIcon icon={faThumbsUp} /></span>Me gusta </span>
                </div>
            </div>
        )
    }
}