import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

export default function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState({
        name: "",
        email: "",
        image: "",
        imageA: "",
        tag: "",
        title: "",
        content: "",
        createdAt: ""
    });

    const loadArticle = useCallback(() => {
        axios.get(`https://mediumbackend-production.up.railway.app/getArticle1/${id}`)
            .then(res => setArticle(res.data.article))
            .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        loadArticle();
    }, [loadArticle]);

    return (
        <div id="articleData">
            <div id='extradiv'></div>
            <h1>{article.title}</h1>
            <div id="profileInfo">
                <img alt="logo" src={article.image} width={20} height={20} />
                <p><b>{article.name}</b> in {article.tag}</p>
            </div>
            <img alt="logo" id="contentImg" src={article.imageA} />
            <p id="content">{article.content}</p>
            <div id='extradiv2'></div>
        </div>
    );
}