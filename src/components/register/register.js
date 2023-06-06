import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const navigate=useNavigate();
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    image:""
  })
  const {image,name,email,password}=user;
  const onValChange=e=>{
    setUser({...user,[e.target.name]:e.target.value});
  }
  const handleSubmit=()=>{
    if(user.name && user.email,user.password){
    const a={
      image:user.image,
      name:user.name,
      email:user.email,
      password:user.password
    }
    axios.post("http://localhost:4000/register",a).then(res=>{
      alert(res.data.message);
      navigate("/login");
    });}
    else{
      alert("please fill details");
    }
  }
  return (<div id="loginDiv"><div id='extradiv'></div>
        <div id="registerCom">
            <h1 >REGISTER</h1>
         
                <table >
                    <tr>
                        <td >
                            Name :<input type="text" class="form-control" name="name" value={name}onChange={e=>onValChange(e)} />
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Email :<input type="text" class="form-control "name="email" value={email}onChange={e=>onValChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                      <td>
                            Password :<input type="number" class="form-control "name="password" value={password}onChange={e=>onValChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Image url :<input type="text" class="form-control" name="image" value={image}onChange={e=>onValChange(e)} />
                        </td>
                    </tr>
                    <tr >
                        <td colSpan={2}>
                        <button className='btn btn-dark form-control'  onClick={()=>handleSubmit()}>Register</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Already have account ? <a href='login' id='link'>Login</a></td>
                    </tr>
                </table>
                
            

        </div></div>
  )
}