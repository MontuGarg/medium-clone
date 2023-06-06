import axios from 'axios';
import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateW() {
    const {id}=useParams();
    const navigate=useNavigate();
    const [article,setArticle]=useState({
        tag:"",
        title:"",
        content:"",
        imageA:""
    });
    const {imageA,title,content}=article;
    const onValChange=e=>{
        setArticle({...article,[e.target.name]:e.target.value});
    }
    useEffect(()=>{
        loadArticle();
    },[])
    const loadArticle=()=>{
        try{
            axios.post(`http://localhost:4000/getArticle/${id}`).then(res=>{
            setArticle(res.data.article);
          })
        }catch(Error){
          console.log(Error);
        }
      }
    const handleSubmit=()=>{
        let user =JSON.parse(localStorage.getItem("LoginUser"));
        let a={
            name:user.name,
            image:user.image,
            email:user.email,
            tag:article.tag,
            title:article.title,
            content:article.content,
            imageA:article.imageA

        }
        console.log(a);
        if(article.tag && article.content && article.title){
            axios.post(`http://localhost:4000/updateArticle/${id}`,a).then(res=>{
                alert(res.data.message);
                navigate("/");
            })
        }
    }
  return (
    <div id="article">
       <div id="extradiv"></div>
       <button className='btn btn-success' onClick={handleSubmit}>Update</button>
       <div id="writingArea">
           <h4 style={{textAlign:"left"}}>Add Tag</h4>
            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="tag" onBeforeInput={e=>onValChange(e)}  onChange={e=>onValChange(e)}>
                <option disabled selected>Select Tag</option>
                <option value="life">Life</option>
                <option value="media">Media</option>
                <option value="programming">Programming</option>
                <option value="self improvement">Self Improvement</option>
                <option value="work">Work</option>
                <option value="technology">Technology</option>
                <option value="society">Society</option>
                <option value="culture">culture</option>
                <option value="world">World</option>
            </select>
            <h4 style={{textAlign:"left"}}>Img Url</h4>
            <input type="text" name="imageA" className='form-control' placeholder='Image URL' value={imageA} onChange={e=>onValChange(e)}></input>
            <h4 style={{textAlign:"left"}}>Title</h4>
            <input type="text" name="title" className='form-control' placeholder='Title' value={title} onChange={e=>onValChange(e)}></input>
            <h4 style={{textAlign:"left"}}>Content</h4>
            <textarea className='form-control'placeholder='Content'name="content" value={content} onChange={e=>onValChange(e)}></textarea>
       </div>
       <div id="extradiv2"></div>
    </div>
  )
}
