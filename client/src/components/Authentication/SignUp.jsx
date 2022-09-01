import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const SignUpStyling = styled.div`
text-align:center;
height:100vh;
background:black;
.mainSignUpDiv{
  width:360px;
  margin:auto;
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
  opacity:0.9;
  widht:100%;
  height:fit-content;
  padding:10px 0px 50px 0px;
  
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
  margin-top: 10px;
  margin-bottom:20px;
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
`
const defaultForm = {
  email: '',
  firstname: '',
  password: '',
  confirmPassword: ''
}
const SignUp = () => {
  const [formData, setFormData] = useState(defaultForm)
  const navigate = useNavigate();
  var a = JSON.parse(localStorage.getItem('TodoLoginAuth')) || {};
  var len = Object.keys(a).length;
  React.useEffect(() => {
      if (len!==0) {
          return navigate("/");
      }
  }, [a]);
  
  const handleChange = (e) => {
    var { name, value } = e.target;
    if(name){setFormData({ ...formData, [name]: value })}
    else{setFormData({ ...formData, role: value })}
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://jaynikatandelfullstack.herokuapp.com/signup', formData)
        .then((d) => {
          alert(d.data.message)
          navigate('/login')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
    catch (err) {
      console.log('error in POST request', err)
    }
  }
  return (
    <SignUpStyling>
      <div className='mainSignUpDiv' style={{paddingTop:'60px'}}>
        <div className='SignUpformDiv'>
        <Link to="#"><h1 style={{marginTop:'30px', fontSize:'40px'}}>SignUp</h1></Link>
          <form className='SignUpform' onSubmit={handleSubmit}>
            <input type="text" className='SignUpinputAdjust' onChange={handleChange} name='firstname' placeholder='Full Name' />
            <input type="email" className='SignUpinputAdjust' onChange={handleChange} name='email' placeholder='Enter Email here' />
            <input type="password" className='SignUpinputAdjust' onChange={handleChange} name='password' placeholder='Password' />
            <input type="submit" onClick={handleSubmit} className='SignUpSubmitButton' value='Sign up' />
          </form>
        </div>
      </div>
    </SignUpStyling>
  )
}

export default SignUp

