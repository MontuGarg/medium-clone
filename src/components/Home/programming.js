import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Programming() {
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
      axios.get("http://localhost:4000/getArticle3",).then(res=>{
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
      <div id="extradiv2"></div>
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