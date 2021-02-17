import { Switch, Route, Redirect} from "react-router-dom";
import { adminRoutes } from "./routes/index";
import Frame from "./components/Frame/Index";
import { isLogined } from "./utils/auth";
import './App.css'
import { Component } from "react";

export default class App extends Component {
  
  render(){
    return (isLogined() ?
    <Frame>
     <Switch>
       {
         adminRoutes.map(route => {
           return (
            <Route 
              key={route.path} 
              path={route.path}
              exact={route.exact}
              component = {route.component}        
            />
           )
         })
       }
       <Redirect to='/admin/dashboard' from='/admin'/>
       <Redirect to='/404'/>
     </Switch>
     </Frame> : <Redirect to='/login' />
  );
 }
}
