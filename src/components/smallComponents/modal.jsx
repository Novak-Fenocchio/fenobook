import React, { Component, useState } from 'react'

import axios from 'axios';


import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import Cookies from 'universal-cookie';

const cookies = new Cookies();



export default  function Example(props) {
    const [show, setShow] = useState(false);
    const [avatar, setAvatar] = useState('')
    const [id, setId] = useState('')

    let  countAvatar = 0;


    const selectAvatar = (e) =>
    {
      e.preventDefault();
      const avatarNumber = e.target.elements.avatar.value;

      setAvatar(avatarNumber)
      setId(cookies.get('id')) 
    }

    const confirmChange = () =>
    {
      cookies.set('avatar', avatar, {path : '/'})
      const changeAvatar = {
        id: id,
        avatar: avatar
      }
      console.log(changeAvatar);
      setShow(false)

      cookies.set('avatar', avatar, {path: '/'})

      axios.post('http://localhost:1500/user/changeAvatar', changeAvatar)
      props.changed() 
    }

    return (
      <>
        <Button  className={props.buttonClass} onClick={() => setShow(true)}>
          {props.button}
        </Button>
  
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          
            <p>
              {props.message}


            {props.type == 'avatarSelector' &&
              <div className="container-avatar-selector">
                {props.array.map(image =>
                  {
                    countAvatar++
                    return(
                    <form className="" onSubmit={selectAvatar}>
                      <button type="submit" name='avatar' className="btnOff btnChangeAvatarSelector" value={countAvatar}>
                       <img 
                          src={image}
                          >
                        </img>
                      </button>
                    </form>)
                  })}
              </div>
            }

            {props.type == 'usersLikes' &&
              <div className="container-avatar-selector">
                
              <ol className='listLikes'>
              {props.array.map(user => 
                  {
                      return(
                        <li>
                          <h4 className='userLike'>{user}</h4>
                        </li>
                        ) 
                  })
                }
                </ol>
                  
              </div>
            }
            
            </p>
          
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)} >{props.cancel}</Button>
            <Button variant="primary" onClick={() => confirmChange()} >{props.accept}</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
