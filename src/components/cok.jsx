import React from 'react';

const Form = (props) =>
{

    return(
            <div className='container-form-poster'>
                <form action='/' method="GET" id='formTrue' className="inputFalses" onSubmit={props.dale} >
                <input type="text" name='ida'/>
                    <button type='submit'>Publicar</button>
                </form> 
            </div>
       );
    }
export default Form