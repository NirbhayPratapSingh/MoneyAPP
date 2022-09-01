import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AllTodo = () => {
    var a = JSON.parse(localStorage.getItem('TodoLoginAuth')) || {};
    var len = Object.keys(a).length;
    const navigate = useNavigate();
    // console.log(a)
    React.useEffect(() => {
        if (len==0) {
            return navigate("/login");
        }
    }, [a]);

    const [text, setText] = useState("")
    const [todo, setTodo] = useState([]);
    const [toggleCompleteBtn, setToggleCompleteBtn] = useState(false)

    const handleText = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(text)
        const a = {
            todo: text
        }
        setText("");
        axios.post("https://jaynikatandelfullstack.herokuapp.com/todos/create", a).then(getTodo)
    }

    //ADD 
    const getTodo = () => {
        axios.get("https://jaynikatandelfullstack.herokuapp.com/todos").then((response) => {
            // console.log(response.data);
            setTodo(response.data);
        });
    }
    useEffect(() => {
        getTodo()
    }, [])


    //COMPLETE
    const handleComplete = async (e) => {
        // console.log(e);
        var tempStatus = e.status.toLowerCase()
        // console.log(tempStatus)
        if(e.status=="done"){
            tempStatus="pending"
        }else{
            tempStatus="done"
        }
        var temp = {
            status: tempStatus,
            tag: e.tag,
            taskname: e.taskname,
            _id: e.id

        }
        if(a.email===e.email){            
        try {
            await axios.patch(`https://jaynikatandelfullstack.herokuapp.com/todos/edit/${e._id}`, temp)
                .then((d) => {
                    // console.log(d)
                    alert('Status updated Successfully !!')
                    navigate('/')
                })
                .catch((err) => {
                    alert('All Fields Required!!')
                }).then(getTodo)
        }
        catch (err) {
            console.log('error in PATCH request', err)
        }
        setToggleCompleteBtn(true)
        
    }
    }

    //DELETE
    const handleDelete = (e) => {
        // console.log(e)
        axios.post(`https://jaynikatandelfullstack.herokuapp.com/todos/delete/${e._id}`).then(getTodo)
        // console.log(e)
    }

    //EDIT

    const handleView = (e) => {
        localStorage.setItem('temproryEditID', JSON.stringify(e._id));
        navigate(`/todos/:todoID`)
    }
    return (
        <div style={{ textAlign: 'center', justifyContent: 'center', background:'black', height:'100vh' }}>
            <div>
                <h2>BLOGS LIST</h2>
                {/* <form onSubmit={handleSubmit}>
                <div className='ui input'>
                    <input value={text} type="text" placeholder='Enter the todo here' onChange={handleText} />
                </div>
                <button className='ui primary button basic' type='submit' onClick={handleSubmit}>Submit</button>
            </form> */}
                {
                    todo.map((e, ind) => {
                        return <div key={ind} style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                            <div className="ui cards" style={{width:'fit-content'}}>
                                <div className="card"  style={{width:'100%'}}>
                                    <div className="content"  style={{width:'100%'}}>
                                        <div className="header" style={{width:'100%', margin:'auto'}}>
                                            {e.taskname}
                                        </div>
                                    </div>
                                    <div className="extra content" style={{width:'fit-content'}}>
                                        <div className="ui three buttons" style={{display:'flex', gap:'10px'}}>
                                            <div className="ui basic green button" onClick={() => handleComplete(e)} style={{width:'fit-content'}}>Current Status &nbsp;{e.status}</div>
                                            <div className="ui basic pink button" onClick={() => handleDelete(e)} style={{width:'fit-content'}}>Delete Blog Here</div>
                                            <div className="ui basic blue button" onClick={() => handleView(e)} style={{width:'fit-content'}}>Edit your Blog Here</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default AllTodo