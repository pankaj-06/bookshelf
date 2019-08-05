import React from 'react'
import { Route } from 'react-router-dom'
import BookCollectionDashboard from './components/BookCollectionDashboard'
import './App.css'

const Routes = (props) => (
    <div className="App">
        <Route exact path='/' component={BookCollectionDashboard} />
    </div>
)

export default Routes
