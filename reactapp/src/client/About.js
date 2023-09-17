import React, { Component } from 'react';
import './app.css';
import TeamImage from './media/hackgt.png';
import BannerLeft from './media/baner-dec-left.png';
import BannerRight from './media/baner-dec-right.png';
import GTLogo from './media/gt-logo.png'; 
import LightHouse from './media/lighthouse.png'; 

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
                        <h2>GT bB <span> (Georgia Tech bubbleBees)</span></h2><br/>
                        <p>We are just a group of friends who wanted to have our HackMIT project be one with an impact. We will tell you with first hand experience that the fifth floor of the Stud is one of the best places to grind out some code.</p><br/><br></br>
                
                          <p>From the beginning, our team was driven to create a service to connect natural disaster victims to nearby available resources provided by relief organizations.
               
                          During natural disasters, many individuals and communities find themselves in desperate need of assistance, without a reliable Internet connection.  People require essential resources such as food, clean water, shelter, and medical supplies to survive. These resources not only address basic human needs but also play a pivotal role in restoring a sense of safety and stability, ultimately facilitating recovery and saving lives.<br></br><br></br>
                        The ability to seek help and stay informed is severely limited.  Without online resources, people and communities may struggle to access critical information, connect with emergency services, or communicate their needs to relief organizations, highlighting the crucial importance of alternative widely-available communication channels, such as SMS, in these challenging situations.  
                        <br></br><br></br>
                        The recent Maui wildfires were particularly challenging for people without Internet access. Without this vital source of information and communication, it became extremely difficult for affected individuals to search for help, access, or connect with relief organizations, further exacerbating the challenges of managing and recovering from such a disaster.
                        <br></br><br></br>
                        LifeLine is a service that provides this essential line of communication.  It connects these individuals and communities over SMS to nearby available resources.   During a natural disaster, relief organizations can submit a resource to the LifeLine database.  People located nearby can search this database for resources they need, such as food, water, shelter, or medical assistance.  LifeLine will respond with a list of available resources, providing a set of walking directions navigating from their current location to the provided resource.
                        <br></br><br></br>
                        Lifeline ultimately restores a sense of safety and stability, facilitates recovery, and enables individuals and communities to rebuild their lives in the face of adversity.
                        </p><br></br><br></br>

                          <p>GT bB is made up of four second-year engineering students who attend the Georgia Institute of Technology.</p>

                  
                      </div>
                    </div>
                    <div style={{width: "50%", padding: "2%"}}>
                      <div class="right-image wow fadeInRight" >
                        <img src={TeamImage} alt="react" style={{ borderRadius: 20}} />
                        <img src={GTLogo} alt="react" style={{padding: "10%"}}/>  
                        {/* <img src={LightHouse} alt="react" style={{paddingLeft: "30%", paddingRight: "30%"}}/>   */}
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