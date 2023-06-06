import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function HomeB() {
  const navigate=useNavigate();
  const [length,setLength]=useState(0);
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
    loadArticle();
  },[]);
  const loadArticle=()=>{
    try{
      axios.get("http://localhost:4000/getArticle").then(res=>{
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
  return (
    <div id="HomeB">
      <div id="displayB">
        <h1>Stay curious.</h1>
        <h3>Discover stories, thinking, and expertise<br></br> from writers on any topic.</h3>
        <a href="login"className='btn btn-dark' >Start reading </a>
      </div>
      <h3 style={{marginLeft:"10%",padding:"3%"}}>Latest on Medium</h3>
      <div id="trending">
        { 
          article.slice(length-6,length).reverse().map((t,index)=>(
            <div id="trend" onClick={()=>navigate(`/ArticleDetail/${t._id}`)}>
              <div style={{display:"flex"}}>
                <h1 style={{color:"lightgray"}}>0{index+1}</h1>
                <div id="trendingD">
                  <div id="profileInfo">
                        <img src={t.image} width={"20px"} height={"20px"}></img>
                        <p><b>{t.name}</b> in {t.tag}</p>
                  </div>
                  <p><b>{t.title.substring(0,50)+"..."}</b></p>
                  <span id="date" >{getDATE(t.createdAt)}</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div id="postD">
            {
              article.slice(0,length).reverse().map((art)=>(
                <div id="postsDiv" onClick={()=>navigate(`/ArticleDetail/${art._id}`)}>
                <div id="posts">
                    <div id="trendingD1">
                        <div id="profileInfo">
                              <img src={art.image} id="postPorfileImg"></img>
                              <p><b>{art.name}</b> in {art.tag}</p>
                        </div>
                        <p><b>{art.title}</b></p>
                        <p>{art.content.substring(0,200)+"..."}</p>
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
        <div id="extradiv2"></div>
      </div>
    
  )
}
