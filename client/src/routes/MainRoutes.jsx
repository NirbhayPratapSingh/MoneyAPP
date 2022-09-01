import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from '../components/Authentication/SignUp'
import CreatingBlog from '../components/CreatingBlog/CreatingBlog'
import SingleTodo from '../components/SingleTodo'
import AllTodo from '../components/AllTodo'
import NoPage from '../components/SubComponents/NoPage'
import SignIn from '../components/Authentication/SignIn'

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AllTodo />} />
        <Route path='/todos' element={<AllTodo />} />
        <Route path='/todos/create' element={<CreatingBlog />} />
        <Route path='/todos/:todoID' element={<SingleTodo />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  )
}

export default MainRoutes