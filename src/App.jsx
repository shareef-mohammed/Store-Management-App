import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from './pages/SigninPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import RequireAuth from './RequireAuth';
import CoWorkersPage from './pages/CoWorkersPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/co-workers/:id' element={<CoWorkersPage />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route element={<RequireAuth/> } >
          <Route path='/admin' element={<Dashboard />} />
        </Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App
