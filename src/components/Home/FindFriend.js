import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FindFriend() {
    const navigate = useNavigate();
    const data1 = JSON.parse(localStorage.getItem("LoginUser"));
    
    const [follow, setFollow] = useState([]);
    const [search, setSearch] = useState([]);
    const [data, setData] = useState([]);

    const loadUsers = useCallback(() => {
        axios.get(`https://mediumbackend-production.up.railway.app/getUsers`)
            .then(res => setData(res.data.user))
            .catch(error => console.log(error));
    }, []);

    const loadFollow = useCallback(() => {
        axios.get(`https://mediumbackend-production.up.railway.app/getFollow/${data1.email}`)
            .then(res => setFollow(res.data.user))
            .catch(error => console.log(error));
    }, [data1.email]);

    useEffect(() => {
        loadUsers();
        loadFollow();
    }, [loadUsers, loadFollow]);

    const handleFollow = (e) => {
        const a = { user1: data1.email, user2: e.email, status: 1 };
        axios.post(`https://mediumbackend-production.up.railway.app/follow`, a)
            .then(() => navigate(`/profile/${e._id}`))
            .catch(error => console.log(error));
    };

    const handleFollowing = (e) => {
        const a = { user1: data1.email, user2: e.email, status: 0 };
        axios.post(`https://mediumbackend-production.up.railway.app/following`, a)
            .then(() => navigate(`/profile/${e._id}`))
            .catch(error => console.log(error));
    };

    const isFollow = (id) => follow.some(f => f.user2 === id && f.status === 1);

    function filterUserNames(searchTerm) {
        const regex = new RegExp(searchTerm, "i");
        return data.filter((user) => regex.test(user.name + user.email));
    }

    const onValChange = () => {
        let a = document.getElementById("inputbutton").value;
        setSearch(filterUserNames(a));
    };
    
    return (
        <div>
            <div id="extradiv"></div>
            <div id="searchdiv">
                <h1>Search</h1>
                <input type='text' className='form-control' placeholder='Search' onChange={onValChange} id='inputbutton' />
            </div>
            <div id="findDiv">
                {search.map((art) => (
                    <div key={art._id} id="Div">
                        <div id="trendingD1">
                            <div id="findProfile">
                                <img alt="logo" src={art.image} id="findProfileImg" onClick={() => navigate(`/profile/${art._id}`)} />
                                <div>
                                    <h4 onClick={() => navigate(`/profile/${art._id}`)}><b>{art.name}</b></h4>
                                    {data1._id === art._id ? null : isFollow(art.email) ? (
                                        <button className='btn btn-outline-success' onClick={() => handleFollowing(art)}>Following</button>
                                    ) : (
                                        <button className='btn btn-outline-success' onClick={() => handleFollow(art)}>Follow</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}