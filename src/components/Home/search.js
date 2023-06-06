import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate=useNavigate();
    const [search,setSearch]=useState([
    ]);
    const [data,setData]=useState([{
        name:"",
    email:"",
    image:"",
    imageA:"",
    tag:"",
    title:"",
    content:"",
    createdAt:""
    }]);
    useEffect(()=>{
        loadUsers();
    },[]);
    const loadUsers=()=>{
        try{
          axios.get(`http://localhost:4000/getArts`).then(res=>{
            setData(res.data.user);
          })
        }catch(Error){
          console.log(Error);
        }
      }
    function filterUserNames(searchTerm) {
        const regex = new RegExp(searchTerm, "i");
        if(data){
          return data.filter((name) => regex.test(name.title+name.name+name.tag));
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
      const getDATE=a=>{
        let k="";
        const d = new Date(a);
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        k+=d.getDate();
        k+=" ";
        k+= month[d.getMonth()];
        // alert(k);
        return k;
      }
  return (
    <div>
        <div id="extradiv"></div>
        <div id="searchdiv">
        <h1>Search</h1>
        <input type='text' className='form-control' placeholder='Search'onChange={onValChange} id='inputbutton'></input></div>
        <div id="postD">
        {
            search.map((art)=>(
            <div id="postsDiv" onClick={()=>navigate(`/ArticleDetail/${art._id}`)}>
            <div id="posts">
                <div id="trendingD1">
                    <div id="profileInfo">
                            <img src={art.image} id="postPorfileImg"></img>
                            <p><b>{art.name}</b> in {art.tag}</p>
                    </div>
                    <p><b>{art.title}</b></p>
                    <p>{art.content.substring(0,200) +"..."}</p>
                    {getDATE(art.createdAt)}
                </div>
                <div>
                    <img src={art.imageA} width={"300px"} height={"200px"}></img>
                </div>
            </div>
            </div>
            ))
        }
        </div>
      
    </div>
  )
}
