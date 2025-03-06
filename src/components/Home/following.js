import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Following() {
  const navigate = useNavigate();
  const data1 = JSON.parse(localStorage.getItem("LoginUser"));
  const [length, setLength] = useState(0);
  const [follow, setFollow] = useState([]);
  const [article, setArticle] = useState([]);

  const loadFollow = useCallback(() => {
    axios.get(`https://mediumbackend-production.up.railway.app/getFollow/${data1.email}`)
      .then(res => setFollow(res.data.user))
      .catch(err => console.log(err));
  }, [data1.email]);

  const loadArticle = useCallback(() => {
    axios.get("https://mediumbackend-production.up.railway.app/getArticle")
      .then(res => {
        setArticle(res.data.article);
        setLength(res.data.article.length);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    loadArticle();
    loadFollow();
  }, [loadArticle, loadFollow]);

  const isFollowing = (id) => follow.some(f => f.user2 === id && f.status === 1);

  const getDATE = (a) => {
    const d = new Date(a);
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${d.getDate()} ${month[d.getMonth()]}`;
  };

  return (
    <div id="HomeB">
      <div id="extradiv2"></div>
      <div id="postD">
        {article.slice(0, length).reverse().filter(art => isFollowing(art.email)).map(art => (
          <div key={art._id} id="postsDiv" onClick={() => navigate(`/ArticleDetail/${art._id}`)}>
            <div id="posts">
              <div id="trendingD1">
                <div id="profileInfo">
                  <img alt='' src={art.image} id="postPorfileImg" />
                  <p><b>{art.name}</b> in {art.tag}</p>
                </div>
                <p><b>{art.title}</b></p>
                <p>{art.content.substring(0, 200) + "..."}</p>
                {getDATE(art.createdAt)}
              </div>
              <div>
                <img alt="" src={art.imageA} width={300} height={200} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="extradiv2"></div>
    </div>
  );
}