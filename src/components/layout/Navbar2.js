import React from 'react'
export default function  Navbar2() {
    const data=JSON.parse(localStorage.getItem("LoginUser"));

  return (
    <div id="navbar">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid ">
                <a className="navbar-brand me-auto medium2" href="/"><h1><img src='https://seeklogo.com/images/M/medium-logo-F0ACFCCD58-seeklogo.com.png' width="60px"></img></h1></a>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0 ">
                    <li className="nav-item">
                    <a className="nav-link active" href="/find">+</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/">For you</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/following">Following</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/selfimprovement">Self Improvement</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/technology">Technology</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/programming">Programming</a>
                    </li>
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0 mediumOption2">
                    <li className="nav-item">
                    <a className="nav-link" href="/search"><img src='https://img.freepik.com/free-icon/zoom_318-56638.jpg' style={{width:"30px",height:"30px"}}></img></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/write2"><img src='https://www.freeiconspng.com/thumbs/writing-icon/writing-icon-4.png' style={{width:"30px",height:"30px"}}></img></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/notification"><img src='https://cdn-icons-png.flaticon.com/512/3119/3119338.png' style={{width:"30px",height:"30px"}}></img></a>
                    </li>
                    
                    <li className="nav-item">
                    <a className="nav-link" href="/logout"><img src='https://cdn-icons-png.flaticon.com/512/126/126467.png' style={{width:"30px",height:"30px"}}></img></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href={`/profile/${data._id}`}><img src={data.image} style={{width:"35px",height:"35px",borderRadius:"100%",border:".2px solid black"}}></img></a>
                    </li>
                </ul>    
                </div>
            </div>
        </nav>
    </div>
  )
}
