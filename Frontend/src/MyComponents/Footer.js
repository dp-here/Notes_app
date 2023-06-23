import React from 'react'
import './css/Footer.css'

export default function Footer() {
  return (
    <div>
         <div className="footer-basic">
        <footer>
            <div className="social"><a href="https://www.instagram.com/"><i className="icon ion-social-instagram"></i></a><a href="https://www.snapchat.com/"><i className="icon ion-social-snapchat"></i></a><a href="https://twitter.com/i/flow/login?in"><i className="icon ion-social-twitter"></i></a><a href="https://www.facebook.com/"><i className="icon ion-social-facebook"></i></a></div>
            <ul className="list-inline">
                <li className="list-inline-item"><a href="/worldwide">Home</a></li>
                <li className="list-inline-item"><a href="/#">Services</a></li>
                <li className="list-inline-item"><a href="/about">About</a></li>
                <li className="list-inline-item"><a href="/#">Terms</a></li>
                <li className="list-inline-item"><a href="/#">Privacy Policy</a></li>
            </ul>
            <p className="copyright">MB_SOFTECH © 2023</p>
        </footer>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
    </div>
  )
}
