import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Technology() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const res = await axios.get("http://localhost:4000/getArticle4");
      setArticles(res.data.article || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${d.getDate()} ${monthNames[d.getMonth()]}`;
  };

  return (
    <div id="HomeB">
      <div id="extradiv2"></div>
      <div id="postD">
        {articles.slice().reverse().map((art) => (
          <div key={art._id} id="postsDiv" onClick={() => navigate(`/ArticleDetail/${art._id}`)}>
            <div id="posts">
              <div id="trendingD1">
                <div id="profileInfo">
                  <img src={art.image} id="postPorfileImg" alt="Profile" />
                  <p><b>{art.name}</b> in {art.tag}</p>
                </div>
                <p><b>{art.title}</b></p>
                <p>{art.content.substring(0, 200) + "..."}</p>
                <p>{formatDate(art.createdAt)}</p>
              </div>
              <div>
                <img src={art.imageA} width="300px" height="200px" alt="Article" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="extradiv2"></div>
    </div>
  );
}
