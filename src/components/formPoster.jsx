import React from 'react';

const Form = (props) =>
{

    return(
            <div className='container-form-poster'>
                <form action='/' method="GET" id='formTrue' className="inputFalses" onSubmit={props.addPost} >
                    <input type="hidden" name='title'/>
                    <textarea name="body" placeholder='¿En qué estas pensando?'></textarea> <br/>
                    <button type='submit'>Publicar</button>
                </form> 
            </div>
       );
    }
export default Form