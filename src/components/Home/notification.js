import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [follows, setFollows] = useState([]);
  const data1 = JSON.parse(localStorage.getItem("LoginUser"));

  useEffect(() => {
    loadArticles();
    loadFollows();
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get("https://mediumbackend-production.up.railway.app/getUsers");
      setUsers(res.data.user || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadFollows = async () => {
    try {
      const res = await axios.get("https://mediumbackend-production.up.railway.app/getFollow");
      setFollows(res.data.user || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadArticles = async () => {
    try {
      const res = await axios.get("https://mediumbackend-production.up.railway.app/getArticle");
      setArticles(res.data.article || []);
    } catch (error) {
      console.error(error);
    }
  };

  const isFollowing = (id) => {
    return follows.some(
      (f) => f.user1 === id && f.status === 1 && data1.email === f.user2
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  return (
    <div id="HomeB">
      <div id="extradiv2"></div>

      {/* Latest Article Section */}
      <div id="postD">
        {articles.length > 0 && (
          <div
            key={articles[articles.length - 1]._id}
            id="postsDiv"
            onClick={() =>
              navigate(`/ArticleDetail/${articles[articles.length - 1]._id}`)
            }
          >
            <h1 style={{ borderBottom: "1px solid grey" }}>Latest Article</h1>
            <div id="posts">
              <div id="trendingD1">
                <div id="profileInfo">
                  <img
                    src={articles[articles.length - 1].image}
                    id="postPorfileImg"
                    alt="Profile"
                  />
                  <p>
                    <b>{articles[articles.length - 1].name}</b> in{" "}
                    {articles[articles.length - 1].tag}
                  </p>
                </div>
                <p>
                  <b>{articles[articles.length - 1].title}</b>
                </p>
                {formatDate(articles[articles.length - 1].createdAt)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notifications Section */}
      <div id="post">
        <h1
          style={{ borderBottom: "1px solid grey", margin: "2cm 0% 0% 10%" }}
        >
          Notifications
        </h1>
        {users
          .filter((user) => isFollowing(user.email))
          .reverse()
          .map((user) => (
            <div
              key={user.email}
              id="postsDiv"
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              <div id="posts">
                <div id="trendingD1">
                  <div id="findProfile">
                    <img
                      src={user.image}
                      id="findProfileImg"
                      alt="Profile"
                    />
                    <h4>
                      <b>{user.name}</b> started following you.
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div id="extradiv2"></div>
    </div>
  );
}
