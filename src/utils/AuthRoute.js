import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


 const AuthRoute = ({component: Component , authenticated ,...rest }) => (
    
        <Route {...rest} /// exact path '....'
        render = {(props) => ( //props is all 
            authenticated === true ? <Redirect to= '/'/> : <Component {...props}/>
        
        )
        }
        />
    

 )
export default AuthRoute
