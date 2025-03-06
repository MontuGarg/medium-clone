import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForYou() {
  const navigate = useNavigate();
  const [length, setLength] = useState(0);
  const [article, setArticle] = useState([]);

  const loadArticle = useCallback(() => {
    axios.get("http://localhost:4000/getArticle")
      .then(res => {
        setArticle(res.data.article);
        setLength(res.data.article.length);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    loadArticle();
  }, [loadArticle]);

  const getDATE = (a) => {
    const d = new Date(a);
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${d.getDate()} ${month[d.getMonth()]}`;
  };

  return (
    <div id="HomeB">
      <div id="extradiv2"></div>
      <div id="postD">
        {article.slice(0, length).reverse().map((art) => (
          <div key={art._id} id="postsDiv" onClick={() => navigate(`/ArticleDetail/${art._id}`)}>
            <div id="posts">
              <div id="trendingD1">
                <div id="profileInfo">
                  <img src={art.image} id="postPorfileImg" alt="Profile" />
                  <p><b>{art.name}</b> in {art.tag}</p>
                </div>
                <p><b>{art.title}</b></p>
                <p>{art.content.substring(0, 200) + "..."}</p>
                {getDATE(art.createdAt)}
              </div>
              <div>
                <img src={art.imageA} width={300} height={200} alt="Article" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="extradiv2"></div>
    </div>
  );
}