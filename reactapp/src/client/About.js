import React, { Component } from 'react';
import './app.css';
import TeamImage from './media/hackgt.png';
import BannerLeft from './media/baner-dec-left.png';
import BannerRight from './media/baner-dec-right.png';
import T2V from './media/T2V_logo.png'; 

export default () => {

    return (
        <div>
          <div class="main-banner" id="top" style={{ paddingLeft: "50", paddingRight: "50", marginTop: "0%"}}>
            <div class="container">
              <div class="row">
                <div class="col-lg-12" style={{display: "flex"}}>
                  <div style={{ display: "flex", flexDirection: "row", marginLeft: "10%", marginRight: '10%'}}>
                    <div style={{width: "50%", padding: "2%"}}>
                      <div class="section-heading">
                        <h2>GT bB <em> (Georgia Tech bubbleBees)</em></h2><br/>
                        <p>We are just a group of friends who wanted to have our MinneHack project be one with an impact. We will tell you with first hand experience that the upper floors of Coffman Union are among the best places to grind out some code.</p><br/>
                
                          <p>From the beginning, our team was driven to create an application to further improve the quality of life and accessibility of daily services, and ultimately increase civic participation in Minnesota and the nation as a whole. </p><br/>
                
                          <p>Every fall, hundreds of people line up outside polling locations on Election Day-- just to cast their ballot and have an opportunity to have their voice heard. In light of recent voting laws and restrictions across the United States, especially in marginalized communities, our team came to the realization that the long and unpredictable lines at the polls is the main reason voters are discouraged from making the trip to the polls.</p><br/>

                          <p><b>TIME2VOTE is an application which provides Minnesota residents with real-time updates and information on polling location wait times, facilitating voting in local, state, and national elections.  TIME2VOTE aims to increase and encourage voter participation in elections by helping voters plan when it’s time to vote and make the trip to the polls.</b></p><br/>

                          <p><b>Using computer vision to determine current poll traffic, TIME2VOTE enables voters to plan more effectively on Election Day, empowering them to use their voice and VOTE.</b></p><br/>

                          <p>GT bB is made up of four first-year engineering students who attend the Georgia Institute of Technology. Three of the members are proud to call Minnesota their home.</p>

                  
                      </div>
                    </div>
                    <div style={{width: "50%", padding: "2%"}}>
                      <div class="right-image wow fadeInRight" >
                        <img src={TeamImage} alt="react" style={{ borderRadius: 20}} />
                        <img src={T2V} alt="react" style={{padding: "30%"}}/>  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }