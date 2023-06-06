import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Notification() {
  const navigate=useNavigate();
  const [length,setLength]=useState(0);
  const [length1,setLength1]=useState(0);
  const data1=JSON.parse(localStorage.getItem("LoginUser"));
  const [users,setUsers]=useState([{
    name:"",
    email:"",
    image:"",
}]);
  const [follow,setFollow]=useState([{
    user1:"",
    user2:"",
    status:"",
}])
  const [article,setArticle]=useState([{
    name:"",
    email:"",
    image:"",
    imageA:"",
    tag:"",
    title:"",
    content:"",
    createdAt:""
  }]);
  const loadUsers=()=>{
    try{
      axios.get(`http://localhost:4000/getUsers`).then(res=>{
        setUsers(res.data.user);
        setLength1(res.data.user.length);
      })
    }catch(Error){
      console.log(Error);
    }
  }
  useEffect(()=>{
    loadArticle();
    loadFollow();
    loadUsers();
  },[]);
  const loadFollow=()=>{
    try{
      axios.get(`http://localhost:4000/getFollow`).then(res=>{
        setFollow(res.data.user);
      })
    }catch(Error){
      console.log(Error);
    }
  }
  const loadArticle=()=>{
    try{
      axios.get("http://localhost:4000/getArticle",).then(res=>{
        setArticle(res.data.article);
        setLength(res.data.article.length);
      })
    }catch(Error){
      console.log(Error);
    }
  }
  
  const isfollowing=(id)=>{
    let flag=false;
    follow.map((f)=>{
        if(f.user1===id && f.status===1 && data1.email===f.user2){
            flag=true;
        }
    })
    return flag;

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
    <div id="HomeB">
      <div id="extradiv2"></div>
      
      <div id="postD">
       
      {
        article.slice(length-1,length).map((art)=>(
           
          <div id="postsDiv" onClick={()=>navigate(`/ArticleDetail/${art._id}`)}><h1 style={{borderBottom:"1px solid grey"}}>Latest Article</h1>
          <div id="posts">
              <div id="trendingD1">
                  <div id="profileInfo">
                        <img src={art.image} id="postPorfileImg"></img>
                        <p><b>{art.name}</b> in {art.tag}</p>
                  </div>
                  <p><b>{art.title}</b></p>
                  {getDATE(art.createdAt)}
              </div>
              
          </div>
        </div>
        ))
      }
      </div>
      <div id="post">
       <h1 style={{borderBottom:"1px solid grey",margin:"2cm 0% 0% 10%"}}>Notifications</h1>
      {
        users.slice(0,length1).reverse().map((art)=>(
           isfollowing(art.email)?
          <div id="postsDiv" onClick={()=>navigate(`/profile/${art._id}`)}>
          <div id="posts">
              <div id="trendingD1">
                  <div id="findProfile">
                        <img src={art.image} id="findProfileImg"></img>
                        <h4><b>{art.name}</b> is Started following you.</h4>
                  </div>
              </div>
              
          </div>
        </div>:<></>
        ))
      }
      </div>
      <div id="extradiv2"></div>

    </div>
  )
}