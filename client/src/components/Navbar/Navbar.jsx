import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useEffect } from 'react';


const MainNavbar = styled.div`
height:60px; 
width:100vw;
display:flex;
justify-content:center;
box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
background-color:#d9cfb0;
position:fixed;
top:0;
z-index:1000000000000;
.mainNavDivSmall{
    visibility:hidden;
    background-color:white;
    position:fixed;
}
.mainNavDiv{
    position:fixed;
    top:0;
    ${'' /* border:1px solid black; */}
    width:950px;
    margin:auto;
    display:grid;
    grid-template-columns:0.8fr 1fr;
    justify-content:space-around;
}
.searchHide{
    visibility:visible; 
}

.mainNavSearchPart{
    display:flex;
    align-items:center;
    margin:auto;
    width:75%;
    height:40px;
    border-radius:8px;
    background-color:#efefef;
    visibility:visible;
}
.searchInput{
    background-color:#efefef;
    font-size:17px;
    font-family:-apple-system, -apple-system,BlinkMacSystemFont, 'Segoe UI', Roboto,Oxygen, Ubuntu, Cantarell, 'Open Sans','Helvetica Neue', sans-serif;
    border:0;
    outline: none;
    width:100%;
    opacity:0.6;
    
}
.navbarDivLinks{
    display:flex;
    list-style:none;
    justify-content:space-between;
}
.navbarLinks{
    height:23px;
}
@media (max-width: 950px) {
    .akBlogLogo{
        float:center;
    }
    .mainNavDiv{
        width:850px;
        grid-template-columns:0.6fr 1fr 1fr;
    }
    .mainNavSearchPart{
        width:75%;
        visibility:visible;
    }
}

`

const Navbar = () => {
    var a = JSON.parse(localStorage.getItem('TodoLoginAuth')) || {};
    var len = Object.keys(a).length;
    if(len!==0){
        var name = a.email.split("@")[0];
    }
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [navToggle, setNavToggle] = React.useState(true);
    const open = Boolean(anchorEl);

    useEffect(()=>{
        if(len==0){
            setNavToggle(true)
        }else{
            setNavToggle(false)
        }
    },[a])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setNavToggle(true)
    };
    const handleLogout = () => {
        // console.log('logout');
        alert('Logged Out Successfully!!');
        // localStorage.removeItem('TodoLoginAuth');
        localStorage.setItem('TodoLoginAuth',JSON.stringify({}));
        setNavToggle(false)
        navigate("/login")
    };

    return (
        <MainNavbar>
            <React.Fragment>

                <div className='mainNavDiv'>
                    <div style={{display:'flex', alignItems:'center',gap:'30px' }}>
                    <Link to="/" style={{fontSize:'25px', fontWeight:'700',marginLeft:'15px', marginTop:'15px'}} >{name}</Link>
                    <img height="35px" style={{borderRadius:'50%', backgroundColor:'#d9cfb0'}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.7gnaBhWvDyXnLAPYUziMVAHaKL%26pid%3DApi&f=1" alt='ProfilePick' />
                    </div>
                    <ul className='navbarDivLinks'>
                        {
                            navToggle ? <li><Link to="/login" style={{fontSize:'15px', fontWeight:'500'}} >SignIn</Link></li>
                            : <li><Link to="#" onClick={()=>handleLogout()} style={{fontSize:'15px', fontWeight:'500'}} >Logout</Link></li>                       
                        }
                        <li><Link to="/signup" style={{fontSize:'15px', fontWeight:'500'}} >SignUp</Link></li>
                        <li><Link to="/" style={{fontSize:'15px', fontWeight:'500'}} >All Blogs</Link></li>
                        <li><Link to="/todos/create" style={{fontSize:'15px', fontWeight:'500'}}>Write New Blog</Link></li>
                    </ul>
                </div>
            </React.Fragment>
        </MainNavbar>
    )
}

export default Navbar