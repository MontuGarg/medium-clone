import React from 'react'
import image from "../../images/insights.jpg"
import { Link } from 'react-router-dom'
export default function  Navbar() {
  return (
    <div id="navbar">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid ">
                <Link className="navbar-brand me-auto medium" to="/"><h1><img alt="logo" src={image} width="60px"></img>Insights</h1></Link>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0 mediumOption">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/ourstory">Our story</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/membership">Membership</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/WRITE">Write</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/login">Sign in</Link>
                    </li>
                    <li>
                    <Link to="/login"className=" btn btn-circle btn-dark "  type="submit">Get started</Link>
                    </li>
                </ul>    
                </div>
            </div>
        </nav>
    </div>
  )
}
