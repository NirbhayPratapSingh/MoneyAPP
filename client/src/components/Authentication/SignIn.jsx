import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const SignInStyling = styled.div`
text-align:center;
background:black;
height:100vh;
.mainSignInDiv{
  width:360px;
  margin:auto;
  margin-top:10px;
}
.akBlogLogo{
  height:55px;
  margin-top:4vh;
}
.SignInformDiv{
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius:5px;
  background-color:white;
  opacity:0.8;
  widht:100%;
  height:410px;
}
.SignInform{
  widht:100%;
  height:fit-content;
  margin-top:30px;
  display:grid;
  gap:7px;
}
.SignininputAdjust{
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
.SignInSubmitButton{
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
  margin-top:-10px;
  cursor:pointer;
}
.SignInSubmitButton:hover{
  background-color:#50a8ea;
}
.POR{
  font-size:"19px";
  font-weight:600;
  opacity:0.8;
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

`
const defaultForm = {
  email: '',
  password: ''
}

const SignIn = () => {
  const [formData, setFormData] = useState(defaultForm)
  const navigate = useNavigate();
  var a = JSON.parse(localStorage.getItem('TodoLoginAuth')) || {};
  var len = Object.keys(a).length;
  React.useEffect(() => {
    if (len !== 0) {
      return navigate("/");
    }
  }, [a]);

  const handleChange = (e) => {
    var { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://jaynikatandelfullstack.herokuapp.com/login', formData)
        .then((d) => {
          // console.log(d.data.ResponseToFrontEnd)
          localStorage.setItem('TodoLoginAuth', JSON.stringify(d.data.ResponseToFrontEnd))
          alert(d.data.message)
          navigate('/')
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
    <SignInStyling>
      <div className='mainSignInDiv' style={{ paddingTop: '10px' }}>
        <div className='SignInformDiv' style={{ marginTop: '100px' }}>
          <Link to="#"><h1 style={{ paddingTop: '45px', fontSize: '35px', color:'grey' }}>Login</h1></Link>
          <form className='SignInform' style={{ marginTop: '50px' }} onSubmit={handleSubmit}>
            <input type="text" className='SignininputAdjust' onChange={handleChange} name='email' placeholder='Enter your email' />
            <input type="password" className='SignininputAdjust' onChange={handleChange} name='password' placeholder='Password' /><br />
            <input type="submit" className='SignInSubmitButton' onClick={handleSubmit} value='Log In' />
          </form>
        </div>
      </div>
    </SignInStyling>
  )
}

export default SignIn