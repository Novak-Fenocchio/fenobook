import Dashboard from './components/dashboard';
import axios from 'axios';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Cookies from 'universal-cookie';

/* Components */
import FormSignUp from './components/signUp';
import FormSignIn from './components/signIn';



const cookies = new Cookies();


function App() {
  return (
    <div className="App"> 
      <BrowserRouter>

        <Switch>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/signIn' component={FormSignIn}/>
          <Route exact path='/signUp' component={FormSignUp}/>
          
        </Switch>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
