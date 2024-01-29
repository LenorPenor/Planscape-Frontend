import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import Header from './components/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProfileSettings from './pages/ProfileSettings'
import Project from './pages/Project'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'

import './App.css'

function App() {
	return (
		<div>
		<Header/>
		<Router>
			<Routes>
				<Route 
					path='/'
					exact
					element={<Home />} 
				/>
				<Route 
					path='/register' 
					exact 
					element={<Register />} 
				/>
				<Route 
					path='/login' 
					exact 
					element={<Login />} />
				<Route 
					path='/profile' 
					exact 
					element={<Profile />} 
				/>
				<Route 
					path='/profile-settings' 
					exact 
					element={<ProfileSettings />} 
				/>
				<Route 
					path='/project/:projectId' 
					exact 
					element={<Project />} 
				/>
				<Route 
					path='/forgot-password' 
					exact 
					element={<ForgotPassword />} 
				/>
				<Route 
					path='/reset-password/:token' 
					exact 
					element={<ResetPassword />} 
				/>
				<Route
					path='*'
					element={<NotFound />} 
				/>
			</Routes>
		</Router>
		</div>

	)
  }

export default App

