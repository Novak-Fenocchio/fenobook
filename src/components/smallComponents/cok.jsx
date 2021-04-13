import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'


export default class post extends Component {
    render(props) {
        return (
            <div className='post'>   
                <h5>Novak</h5>
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