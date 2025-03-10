import React from 'react'
import { Link } from 'react-router-dom'

export default function Write() {
  return (
    <div id="write">
        <div id="extradiv"></div>
        <h6>START A BLOG FOR FREE</h6>
      <h1>Publish and grow, all in one place.</h1>
      <p>If you have a story to tell, knowledge to share, or a perspective to offer — welcome home. Sign up for free so your writing can thrive in a network supported by millions of readers — not ads.<br></br><br></br>
      <Link to='login' className='btn btn-light'>Start Writing</Link></p>

    </div>
  )
}