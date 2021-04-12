import React from 'react';

const signIn = (props) =>
{
    return(
        <div>
            <form method="POST" onSubmit={props.dale}>
                <input type="text" name='username' />
                <input type="text" name='password'/>
                <button type='submit' >SignIn</button>
            </form>
        </div>
       );
    }
export default signIn