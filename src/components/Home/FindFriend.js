import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function FindFriend() {
    const navigate=useNavigate();
    const data1=JSON.parse(localStorage.getItem("LoginUser"));
    
    const [follow,setFollow]=useState([{
        user1:"",
        user2:"",
        status:"",
    }])
    const [search,setSearch]=useState([
    ]);
    const [data,setData]=useState([{
        name:"",
        email:"",
        image:"",
    }]);
    useEffect(()=>{
        loadUsers();
        loadFollow();
    },[]);
    const loadUsers=()=>{
        try{
          axios.get(`http://localhost:4000/getUsers`).then(res=>{
            setData(res.data.user);
          })
        }catch(Error){
          console.log(Error);
        }
      }
      const loadFollow=()=>{
        try{
          axios.get(`http://localhost:4000/getFollow/${data1.email}`).then(res=>{
            setFollow(res.data.user);
          })
        }catch(Error){
          console.log(Error);
        }
      }
      const handleFollow=(e)=>{
        const a={
            user1:data1.email,
            user2:e,
            status:1,
        }
        try{
          axios.post(`http://localhost:4000/follow`,a).then(res=>{
            
            window.location.reload();

          })
        }catch(Error){
          console.log(Error);
        }
      }
      const handleFollowing=(e)=>{
        const a={
            user1:data1.email,
            user2:e,
            status:0,
        }
        try{
          axios.post(`http://localhost:4000/following`,a).then(res=>{
            
            window.location.reload();

          })
        }catch(Error){
          console.log(Error);
        }
      }
    const isFollow=(id)=>{
        let flag=false;
        follow.map((f)=>{
            if(f.user2===id && f.status===1){
                flag=true;
            }
        })
        return flag;

    }

    function filterUserNames(searchTerm) {
        const regex = new RegExp(searchTerm, "i");
        if(data){
          return data.filter((name) => regex.test(name.name+name.email));
        }
        else{
          return {};
        }
        
      } 
      const onValChange=()=>{
        let a=document.getElementById("inputbutton").value;
        const filteredUserNames = filterUserNames(a);
        setSearch(filteredUserNames);
      }
      
  return (
    <div>
        <div id="extradiv"></div>
        <div id="searchdiv">
        <h1>Search</h1>
        <input type='text' className='form-control' placeholder='Search'onChange={onValChange} id='inputbutton'></input></div>
        <div id="findDiv">
        {
            search.map((art)=>(
            <div id="Div">
                <div id="trendingD1">
                    <div id="findProfile">
                        <img src={art.image} id="findProfileImg"  onClick={()=>navigate(`/profile/${art._id}`)}></img><div>
                        <h4  onClick={()=>navigate(`/profile/${art._id}`)}><b>{art.name}</b></h4>
                        {data1._id===art._id?<></>:isFollow(art.email)?<button className='btn btn-outline-success' onClick={()=>handleFollowing(art.email)}>Following</button>:<button className='btn btn-outline-success' onClick={()=>handleFollow(art.email)}>Follow</button>}
                    </div>
                    </div>
                    
                </div>
            </div>
            ))
        }
        </div>
      
    </div>
  )
}
