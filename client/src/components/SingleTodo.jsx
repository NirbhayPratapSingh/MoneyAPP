import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUpStyling = styled.div`
text-align:center;
margin-top:10px;
background:black;
height:100vh;
.mainSignUpDiv{y
  width:60vw;
  margin:auto;
  margin-top:10px;
}
.akBlogLogo{
  height:55px;
  margin-top:3vh;
  margin-bottom:1vh;
}
.SignUpformDiv{
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius:5px;
  background-color:white;
  widht:100%;
  height:640px;
  
}
.SignUpform{
  widht:100%;
  height:fit-content;
  margin-top:30px;
  display:grid;
  gap:7px;
}
.SignUpinputAdjust{
  height:40px;
  width:80%;
  margin:auto;
  border-radius:5px;
  background-color:#f8f8f8;
  border:none;
  border:0.1px solid #cacaca;
  font-size:12px;
  padding:10px;
}
.SignUpinputAdjust1{
  height:300px;
  width:80%;
  margin:auto;
  border-radius:5px;
  background-color:#f8f8f8;
  border:none;
  border:0.1px solid #cacaca;
  font-size:12px;
  padding:10px;
  margin-bottom:10px;
}
.SignUpSubmitButton{
  height:34px;
  width:80%;
  margin:auto;
  border-radius:5px;
  background-color:#2185d0;
  border:none;
  color:white;
  font-size:15px;
  font-weight:600;
  padding:0px 10px;
  ${'' /* margin-top:-10px; */}
  cursor:pointer;
}
.SignUpSubmitButton:hover{
  background-color:#50a8ea;
}
.POR{
  font-size:"19px";
  font-weight:600;
  opacity:0.7;
  position:relative;
  margin-top:-18px;
  background:white;
}
.DontHaveAccountSignUp{
  margin-top:20px;
  background-color:white;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.playstore{
  width:75%;
}
.fileUpload{
    margin-left:10% ;
    margin-bottom:15px;
}
`

const SingleTodo = () => {
  var a = JSON.parse(localStorage.getItem('TodoLoginAuth')) || '1';
  var temproryEditID = JSON.parse(localStorage.getItem('temproryEditID'))
  console.log(temproryEditID)
  // console.log(a.email)
  const defaultForm = {
    taskname: '',
    status: '',
    tag: 'Personal',
    email: a.email
  }
  const [formData, setFormData] = useState(defaultForm)
  
  const navigate = useNavigate();
  const handleChange = (e) => {
    var { name, value } = e.target;
    if(name){setFormData({ ...formData, [name]: value })}
    else{setFormData({ ...formData, image: value })}
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData)
    try {
      // console.log(formData)
      await axios.patch(`https://jaynikatandelfullstack.herokuapp.com/todos/edit/${temproryEditID}`, formData)
        .then((d) => {
          // console.log(d)
          alert('Data updated Successfully !!')
          navigate('/')
        })
        .catch((err) => {
          alert('All Fields Required!!')
        })
    }
    catch (err) {
      console.log('error in POST request', err)
    }
  }

  return (
    <SignUpStyling>
      <div className='mainSignUpDiv'>
        <div className='SignUpformDiv'><h1 style={{padding:'30px', fontSize:'40px'}}>CREATE BLOG</h1>
          <form className='SignUpform' onSubmit={handleSubmit}>
            <input type="text" className='SignUpinputAdjust' onChange={handleChange} name='taskname' placeholder='Title of Todo'  required/>
            <input type="text" className='SignUpinputAdjust' onChange={handleChange} name='status' placeholder='Todo Status' required/>    
            <select className='SignUpinputAdjust' onChange={handleChange}>
              <option defaultValue value='Personal'>Personal</option>
              <option value='Official'>Official</option>
              <option value='Family'>Family</option>
            </select>
            <input type="submit" onClick={handleSubmit} className='SignUpSubmitButton' value='Post Blog' />
          </form>
        </div>
      </div>
    </SignUpStyling>
  )
}

export default SingleTodo

