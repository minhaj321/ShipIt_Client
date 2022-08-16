import React from 'react'
import { Route } from 'react-router'

const PublicRoute = ({path , component}) => {
   

    return <Route path={path} element={component} /> 
}

export default PublicRoute
