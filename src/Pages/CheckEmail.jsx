import React from 'react';
import NewsletterFooter2 from '../components/Footer/NewsletterFooter2.jsx';
import NavBar from "./../components/Navbar/Navbar";
const CheckEmail = () => {
    return (
        <div>
      <NavBar />

            <h1 style={{marginTop:'100px'}}>
                Check Email
            </h1>
            <p>We have send a link to your registered email address.</p>
            <NewsletterFooter2/>
        </div>
    )
}

export default CheckEmail
