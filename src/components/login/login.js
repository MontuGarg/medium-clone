import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const navigate=useNavigate();
  const [user,setUser]=useState({
    
    email:"",
    password:""
  })
  const {email,password}=user;
  const onValChange=e=>{
    setUser({...user,[e.target.name]:e.target.value});
  }
  const handleSubmit=()=>{
    
    if(user.email && user.password){
    const a={
      email:user.email,
      password:user.password
    }
    axios.post("http://localhost:4000/login",a).then(res=>{
        
        if(res.data.message==="Login Successful"){
            localStorage.setItem("LoginUser",JSON.stringify(res.data.user));
            navigate("/");
            window.location.reload();
        }
        else{
            alert(res.data.message);
        }
    });
    }
    else{
      alert("please fill details");
    }
  }
  return (<div id="loginDiv"><div id='extradiv'></div>
        <div id="registerCom">
            
            <h1 >Login</h1>
         
                <table >
                    <tr>
                        <td >
                            Email :<input type="text" class="form-control "name="email" value={email}onChange={e=>onValChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                      <td>
                            Password :<input type="password" class="form-control "name="password" value={password}onChange={e=>onValChange(e)}/>
                        </td>
                    </tr>
                    <tr >
                        <td colSpan={2}>
                        <button className='btn btn-dark form-control'  onClick={()=>handleSubmit()}>Login</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Not registered ? <a href='register' id='link'>Register</a></td>
                    </tr>
                </table>
                
            

        </div></div>
  )
}