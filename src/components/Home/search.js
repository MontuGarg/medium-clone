import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [search, setSearch] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get("https://mediumbackend-production.up.railway.app/getArts");
      setData(res.data.user || []);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const filterUserNames = (searchTerm) => {
    const regex = new RegExp(searchTerm, "i");
    return data.filter((item) => regex.test(item.title + item.name + item.tag));
  };

  const onValChange = (e) => {
    setSearch(filterUserNames(e.target.value));
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
    <div>
      <div id="extradiv"></div>
      <div id="searchdiv">
        <h1>Search</h1>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search" 
          onChange={onValChange} 
          id="inputbutton"
        />
      </div>
      <div id="postD">
        {search.map((art) => (
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
    </div>
  );
}
