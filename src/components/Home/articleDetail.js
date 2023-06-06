import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ArticleDetail() {
    const {id}=useParams();
    const [article,setArticle]=useState(
        {
            name:"",
            email:"",
            image:"",
            imageA:"",
            tag:"",
            title:"",
            content:"",
            createdAt:""
          }
    );
    useEffect(()=>{
        loadArticle();
    },[]);
    const loadArticle=()=>{
        try{
        
            axios.get(`http://localhost:4000/getArticle1/${id}`).then(res=>{
                setArticle(res.data.article);
            })
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div id="articleData">
        <div id='extradiv'></div>
        <h1>{article.title}</h1>
        <div id="profileInfo">
            <img src={article.image} width={"20px"} height={"20px"}></img>
            <p><b>{article.name}</b> in {article.tag}</p>
        </div>
        <img id="contentImg" src={article.imageA} ></img>
        <p id="content">{article.content}</p>
        <div id='extradiv2'></div>
    </div>
  )
}
