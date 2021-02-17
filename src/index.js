import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { mainRoutes  } from "./routes/index";
import App from './App'
import store from './redux/store'
import 'antd/dist/antd.css'


ReactDOM.render(<Provider store={store}>
<Router>
  <Switch>  
   <Route path='/admin' render={routeProps => <App {...routeProps}/>} />
    {mainRoutes.map(route=>{
      return <Route key={route.path} {...route}/>;
    })} 
    <Redirect to='/admin' from='/'/>
    <Redirect to='/404'/>
  </Switch>
</Router>
</Provider>,document.getElementById('root'));


