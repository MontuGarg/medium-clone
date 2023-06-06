import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function Profile() {
    const {id}=useParams();
    const [myPro,setPro]=useState(false);
    const [length,setLength]=useState(0);
    const data1=JSON.parse(localStorage.getItem("LoginUser"));
    const [follow,setFollow]=useState([{
      user1:"",
      user2:"",
      status:"",
  }])
  const navigate=useNavigate();
  const [user,setUser]=useState({
    image:"",
    name:"",
    email:"",
    password:""
  });
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

  useEffect(()=>{
    loadFollow();
    loadUser();
  },[]);
  const loadUser=()=>{
    const data=JSON.parse(localStorage.getItem("LoginUser"));
    try{
      axios.get(`http://localhost:4000/getUser/${id}`,).then(res=>{
        setUser(res.data.user);
        loadArticle(res.data.user.email);
        if(res.data.user._id===data._id){
            setPro(true);
        }else{
            setPro(false);
        }
      })
    }catch(Error){
      console.log(Error);
    }
  }
  const Artdelete=(e)=>{
    try{
        let a={id:e};
        
        axios.post(`http://localhost:4000/deleteArt`,a).then(res=>{
        window.location.reload();
      })
    }catch(Error){
      console.log(Error);
    }
  }
  const loadArticle=(e)=>{
    try{
        let a={email:e};
        
        axios.post(`http://localhost:4000/getArticles/${id}`,a).then(res=>{
        setArticle(res.data.article);
        setLength(res.data.article.length);
      })
    }catch(Error){
      console.log(Error);
    }
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
  const loadFollow=()=>{
    try{
      axios.get(`http://localhost:4000/getFollow/${data1.email}`).then(res=>{
        setFollow(res.data.user);
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
  return (
    <div id="HomeB">
      <div id="extradiv"></div>
      <div id="profile">
            <img src={user.image} id="profileImg"></img>
            <div>
            <h1>{user.name}</h1><br></br>
            {data1._id===user._id?<></>:isFollow(user.email)?<button className='btn btn-outline-success' onClick={()=>handleFollowing(user.email)}>Following</button>:<button className='btn btn-outline-success' onClick={()=>handleFollow(user.email)}>Follow</button>}
            
            </div>
      </div>
       <h1 style={{margin:" 2% 0% 0% 11% ",borderLeft:"7px solid black",padding:"2%"}}>Articles Posted</h1>
      <div id="profilePD">
       
      {
        article.slice(0,length).reverse().map((art)=>(
          <div id="profilePost">
          <div id="">
            <div onClick={()=>navigate(`/ArticleDetail/${art._id}`)}>
                <b>{getDATE(art.createdAt)}</b>
                <img src={art.imageA} width={"300px"} height={"200px"}></img>
              </div>
              <div id="title"  onClick={()=>navigate(`/ArticleDetail/${art._id}`)}>
                  <p><b>{art.title.substring(0,67)+"..."}</b></p>
                  
              </div>
              {myPro?
              <div>
                <button className='btn btn-outline-dark ' style={{marginRight:"27%"}}  onClick={()=>Artdelete(art._id)}>Delete</button><button className='btn btn-outline-dark ' onClick={()=>navigate(`/updateArticle/${art._id}`)}>Update</button>
              </div>
              :<div></div>
              }
          </div>
        </div>
        ))
      }
      </div>
      
      <div id="extradiv2"></div>

    </div>
  )
}
