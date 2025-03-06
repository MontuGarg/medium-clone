import React from 'react'
import image from "../../images/insights.jpg"
import { Link} from 'react-router-dom';
export default function  Navbar2() {
    const data=JSON.parse(localStorage.getItem("LoginUser"));
  return (
    <div id="navbar">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid ">
                <Link className="navbar-brand me-auto medium2" to="/"><h1><img alt="logo" src={image} width="60px"></img></h1></Link>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0 ">
                    <li className="nav-item">
                    <Link className="nav-link active" to="/find">+</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/">For you</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/following">Following</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/selfimprovement">Self Improvement</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/technology">Technology</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/programming">Programming</Link>
                    </li>
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0 mediumOption2">
                    <li className="nav-item">
                    <Link className="nav-link" to="/search"><img alt="" src='https://img.freepik.com/free-icon/zoom_318-56638.jpg' style={{width:"30px",height:"30px"}}></img></Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/write2"><img alt="" src='https://www.freeiconspng.com/thumbs/writing-icon/writing-icon-4.png' style={{width:"30px",height:"30px"}}></img></Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/notification"><img alt="" src='https://cdn-icons-png.flaticon.com/512/3119/3119338.png' style={{width:"30px",height:"30px"}}></img></Link>
                    </li>
                    
                    <li className="nav-item">
                    <span className="nav-link" onClick={()=>{localStorage.clear();window.reload()}}><img alt="" src='https://cdn-icons-png.flaticon.com/512/126/126467.png' style={{width:"30px",height:"30px"}}></img></span>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={`/profile/${data._id}`}><img alt="" src={data.image} style={{width:"35px",height:"35px",borderRadius:"100%",border:".2px solid black"}}></img></Link>
                    </li>
                </ul>    
                </div>
            </div>
        </nav>
    </div>
  )
}
