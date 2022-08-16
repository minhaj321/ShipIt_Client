import React from 'react'
import {Route} from 'react-router'
import Login from '../../Pages/Login';


const PrivateRoute = ({path , component}) => {
    
    var user=localStorage.getItem('user');

    if(user == null){
        <Route path='/login' element={<Login />}  /> 
    }else{
        <Route path={path} element={component}  /> 
    }
}

export default PrivateRoute




