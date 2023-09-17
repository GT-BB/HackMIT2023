import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        {/* {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <img src={ReactImage} alt="react" /> */}
          <body>

          {/* <!-- ***** Preloader Start ***** --> */}
          <div id="js-preloader" class="js-preloader">
            <div class="preloader-inner">
              <span class="dot"></span>
              <div class="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          {/* <!-- ***** Preloader End ***** --> */}

          {/* <!-- ***** Header Area Start ***** --> */}
          <header class="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <nav class="main-nav">
                    {/* <!-- ***** Logo Start ***** --> */}
                    <a href="index.html" class="logo">
                      <h4>Vote<span>Tracker</span></h4>
                    </a>
                    {/* <!-- ***** Logo End ***** -->
                    <!-- ***** Menu Start ***** --> */}
                    <ul class="nav">
                      <li class="scroll-to-section"><a href="#top" class="active">Home</a></li>
                      <li class="scroll-to-section"><a href="#portfolio">Instructions</a></li>
                      <li class="scroll-to-section"><a href="about.html">About Us</a></li>
                      <li class="scroll-to-section"><div class="main-red-button"><a href="#contact">Contact Now</a></div></li> 
                    </ul>        
                    <a class='menu-trigger'>
                        <span>Menu</span>
                    </a>
                    {/* <!-- ***** Menu End ***** --> */}
                  </nav>
                </div>
              </div>
            </div>
          </header>
            {/* <!-- ***** Header Area End ***** --> */}

          <div class="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-6 align-self-center">
                      <div class="left-content header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                        <h2>Search your <em>voting location </em> &amp; track <span>wait times</span></h2>
                        <p>Vote Tracker is a Minnesota service that allows you to see approximate waiting times at your voting location in real time, helping you plan your trip to the polls.</p>
                        <h6><a rel="nofollow" href="https://pollfinder.sos.state.mn.us/" target="_blank">Find your voting address</a></h6>
                        <form id="search" action="#" method="GET">
                          <fieldset>
                            <input type="address" name="address" class="email" placeholder="Enter your voting location address..." autocomplete="on" required/>
                          </fieldset>
                          <fieldset>
                            <button type="submit" class="main-button">Search</button>
                          </fieldset>
                        </form>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                        <img src="assets/images/banner-right-image.png" alt="team meeting"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="services" class="our-services section">
            <div class="container">
              <div class="row">
                <div class="col-lg-12 wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.2s">
                  <div class="section-heading">
                    <h2>The waiting time at <em>333 EAST RIVER PKWY</em> is approximately <span>35 minutes</span></h2>
                    <p>Space Dynamic HTML5 template is free to use for your website projects. However, you are not permitted to redistribute the template ZIP file on any CSS template collection websites. Please contact us for more information. Thank you for your kind cooperation.</p>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="first-bar progress-skill-bar">
                        <h4>Approximate Wait Time</h4>
                        <span>35 minutes</span>
                        <div class="filled-bar"></div>
                        <div class="full-bar"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="portfolio" class="our-portfolio section">
            <div class="container" style="background-color: #E5E4EC; border-radius: 40px; padding: 40px;">
              <div class="row">
                <div class="col-lg-8 offset-lg-2">
                  <div class="section-heading  wow bounceIn" data-wow-duration="1s" data-wow-delay="0.2s">
                    <h2>Instructions<br/><em>Voting Information </em></h2>
                    <h4>1. Find your voting/polling location</h4>
                    <p>Minnesota Polling Place Finder: <a href="https://pollfinder.sos.state.mn.us/" target="_blank">https://pollfinder.sos.state.mn.us/</a></p><br/><br/>

                    <h4>2. Copy the address of your voting location</h4>
                    <p>See the example image below</p>
                    <img src="assets\images\search-address.png" alt="" style="border-radius: 20px;"/><br/><br/><br/>

                    <h4>3. Paste the address of your voting location in VoteTracker to see approximate wait times</h4>
                    <p>Vote Tracker will allow you to see approximate waiting times at your voting location in real time</p><br/><br/>

                    <h4>4. Plan your trip to the polls!</h4>
                    <p>Voting hours: <a href="https://www.sos.state.mn.us/elections-voting/election-day-voting/voting-hours/" target="_blank">https://www.sos.state.mn.us/elections-voting/election-day-voting/voting-hours/</a></p>
                    <p>What to bring: <a href="https://www.sos.state.mn.us/elections-voting/election-day-voting/do-i-need-to-bring-id/" target="_blank">https://www.sos.state.mn.us/elections-voting/election-day-voting/do-i-need-to-bring-id/</a></p>
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" class="contact-us section">
            <div class="container">
              <div class="row">
                <div class="col-lg-6 align-self-center wow fadeInLeft" data-wow-duration="0.5s" data-wow-delay="0.25s">
                  <div class="section-heading">
                    <h2>Contact Us Now</h2>
                    <p>Let us know how we're doing, or of any updated waiting times</p>
                    <div class="phone-info">
                      <h4>For any enquiry, Call Us: <span><i class="fa fa-phone"></i> <a href="#">404-894-2000</a></span></h4>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 wow fadeInRight" data-wow-duration="0.5s" data-wow-delay="0.25s">
                  <form id="contact" action="" method="post">
                    <div class="row">
                      <div class="col-lg-6">
                        <fieldset>
                          <input type="name" name="name" id="name" placeholder="Name" autocomplete="on" required/>
                        </fieldset>
                      </div>
                      <div class="col-lg-6">
                        <fieldset>
                          <input type="surname" name="surname" id="surname" placeholder="Surname" autocomplete="on" required/>
                        </fieldset>
                      </div>
                      <div class="col-lg-12">
                        <fieldset>
                          <input type="text" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your Email" required=""/>
                        </fieldset>
                      </div>
                      <div class="col-lg-12">
                        <fieldset>
                          <textarea name="message" type="text" class="form-control" id="message" placeholder="Message" required=""></textarea>  
                        </fieldset>
                      </div>
                      <div class="col-lg-12">
                        <fieldset>
                          <button type="submit" id="form-submit" class="main-button ">Send Message</button>
                        </fieldset>
                      </div>
                    </div>
                    <div class="contact-dec">
                      <img src="assets/images/contact-decoration.png" alt=""/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <footer style="background-color: #f7f7f7;">
            <div class="container">
              <div class="row">
                <div class="col-lg-12 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.25s">
                  <p>Made by: Raey, Samyukta, Grace, and Rikhil
                    <br/>Team billBoard, Georgia Tech
                  <br/>MinneHacks 2023</p>
                </div>
              </div>
            </div>
          </footer>
          {/* <!-- Scripts --> */}
          <script src="vendor/jquery/jquery.min.js"></script>
          <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
          <script src="assets/js/owl-carousel.js"></script>
          <script src="assets/js/animation.js"></script>
          <script src="assets/js/imagesloaded.js"></script>
          <script src="assets/js/templatemo-custom.js"></script>

          </body>

                </div>
    );
  }
}
