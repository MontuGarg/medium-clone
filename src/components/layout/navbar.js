import React from 'react'
export default function  Navbar() {
  return (
    <div id="navbar">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid ">
                <a className="navbar-brand me-auto medium" href="/"><h1><img src='https://seeklogo.com/images/M/medium-logo-F0ACFCCD58-seeklogo.com.png' width="60px"></img>Medium</h1></a>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0 mediumOption">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/ourstory">Our story</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/membership">Membership</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/WRITE">Write</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/login">Sign in</a>
                    </li>
                    <li>
                    <a href="/login"className=" btn btn-circle btn-dark "  type="submit">Get started</a>
                    </li>
                </ul>    
                </div>
            </div>
        </nav>
    </div>
  )
}
