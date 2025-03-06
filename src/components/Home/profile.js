import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [myPro, setPro] = useState(false);
  const [articles, setArticles] = useState([]);
  const [followList, setFollowList] = useState([]);
  const [user, setUser] = useState({
    image: "",
    name: "",
    email: "",
    password: "",
  });

  const data1 = JSON.parse(localStorage.getItem("LoginUser"));

  // Fetch user data
  const loadUser = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:4000/getUser/${id}`);
      setUser(res.data.user);
      setPro(res.data.user._id === data1._id);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  }, [id, data1._id]);

  // Fetch follow list
  const loadFollow = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:4000/getFollow/${data1.email}`);
      setFollowList(res.data.user);
    } catch (error) {
      console.error("Error loading follow list:", error);
    }
  }, [data1.email]);

  // Fetch user articles
  const loadArticles = useCallback(async (email) => {
    try {
      const res = await axios.post(`http://localhost:4000/getArticles/${id}`, { email });
      setArticles(res.data.article);
    } catch (error) {
      console.error("Error loading articles:", error);
    }
  }, [id]);

  // Load user and follow list on component mount
  useEffect(() => {
    loadUser();
    loadFollow();
  }, [loadUser, loadFollow]);

  // Load articles once user data is available
  useEffect(() => {
    if (user.email) {
      loadArticles(user.email);
    }
  }, [user.email, loadArticles]);

  // Delete an article
  const deleteArticle = async (articleId) => {
    try {
      await axios.post(`http://localhost:4000/deleteArt`, { id: articleId });
      setArticles((prev) => prev.filter((art) => art._id !== articleId)); // Remove article from state
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // Follow a user
  const followUser = async (email) => {
    try {
      await axios.post(`http://localhost:4000/follow`, {
        user1: data1.email,
        user2: email,
        status: 1,
      });
      setFollowList([...followList, { user2: email, status: 1 }]); // Update state
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  // Unfollow a user
  const unfollowUser = async (email) => {
    try {
      await axios.post(`http://localhost:4000/following`, {
        user1: data1.email,
        user2: email,
        status: 0,
      });
      setFollowList(followList.filter((f) => f.user2 !== email)); // Update state
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  // Check if the user is already followed
  const isFollowed = (email) => followList.some((f) => f.user2 === email && f.status === 1);

  // Format date
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "long" });

  return (
    <div id="HomeB">
      <div id="extradiv"></div>
      <div id="profile">
        <img src={user.image} id="profileImg" alt="Profile" />
        <div>
          <h1>{user.name}</h1>
          <br />
          {data1._id !== user._id &&
            (isFollowed(user.email) ? (
              <button className="btn btn-outline-danger" onClick={() => unfollowUser(user.email)}>
                Unfollow
              </button>
            ) : (
              <button className="btn btn-outline-success" onClick={() => followUser(user.email)}>
                Follow
              </button>
            ))}
        </div>
      </div>

      <h1 style={{ margin: "2% 0% 0% 11%", borderLeft: "7px solid black", padding: "2%" }}>
        Articles Posted
      </h1>

      <div id="profilePD">
        {articles.slice().reverse().map((art) => (
          <div id="profilePost" key={art._id}>
            <div>
              <div onClick={() => navigate(`/ArticleDetail/${art._id}`)}>
                <b>{formatDate(art.createdAt)}</b>
                <img src={art.imageA} width="300px" height="200px" alt="Article" />
              </div>
              <div id="title" onClick={() => navigate(`/ArticleDetail/${art._id}`)}>
                <p>
                  <b>{art.title.substring(0, 67) + "..."}</b>
                </p>
              </div>
              {myPro && (
                <div>
                  <button
                    className="btn btn-outline-dark"
                    style={{ marginRight: "27%" }}
                    onClick={() => deleteArticle(art._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => navigate(`/updateArticle/${art._id}`)}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div id="extradiv2"></div>
    </div>
  );
}
