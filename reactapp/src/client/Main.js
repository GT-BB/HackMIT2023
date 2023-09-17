import React, { useState, Component, useEffect } from 'react';
import './app.css';
import BannerImage from './media/banner-right-image.png';
import SearchAddress from './media/search-address.png';
import Vote from './media/vote.png';
import Data from './estimatedTime.json';



export default () => {

    // const [show, setShow] = useState(true);

    const [address, setAddress] = useState('');
  
    const [message, setMessage] = useState('');

    const [timeLive, setTimeLive] = useState(0);

    const getData = () => {
        fetch('/api/test2')
                .then(res => res.json())
                .then(obj => {
                    console.log(JSON.stringify(obj))
                    console.log(obj.estimatedTime)
                    if (obj.estimatedTime != timeLive) {
                        setTimeLive(obj.estimatedTime);
                    }            
                });
    }

    useEffect(() => {
        const intervalCall = setInterval(() => {
          getData();
        }, 2000);
        return () => {
          // clean up
          clearInterval(intervalCall);
        };
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        setMessage(`${address}`);
        setAddress('');
        
      };

      
    
      function Dashpage(){
        return(
        <h2>{message}</h2>
        );
      }

    return (
        <div styles={{display: "flex"}}>
            <div class="main-banner" id="top" style={{ display: "flex", paddingLeft: "50", paddingRight: "50", marginTop: "-10%", marginLeft: '10%', marginRight: '10%', marginBottom: '0'}}>
                {/* <div class="container"> */}

                <div style={{display: "flex",flexDirection: "row"}}>
                    <div style={{width: "50%", padding: "2%"}}>
                        <div class="left-content header-text">
                            <h2>Track <span>wait times </span> at your <em>polling location</em></h2>
                            <p>TIME2VOTE provides real-time updates and information on polling location wait times, empowering voters to make the trip to the polls and increase civic engagement one vote at a time.</p><br/><p>TIME2VOTE aims to increase and encourage voter participation in elections by helping voters plan when it’s time to vote. Using computer vision to determine current poll traffic, TIME2VOTE enables voters to plan more effectively on Election Day, empowering them to use their voice and VOTE.</p>
                            
                            
                            
                            
                            {/* <div className = 'app'>
                                { 
                                    show?<Homepage/> : <Dashpage/>  
                                }
                                <button onClick = {() => setShow(true)}> Home </button>
                                <button onClick = {() => setShow(false)}> Search</button>
                                </div> */}
                            
                            
                            
                            <h6><a rel="nofollow" href="https://pollfinder.sos.state.mn.us/" target="_blank">Find your polling location</a></h6>
                            <form onSubmit={handleSubmit}>
                                <input
                                type="text"
                                id="address"
                                name="address"
                                value={address}
                                placeholder="Enter polling address ..."
                                onChange={(event) =>
                                    setAddress(event.target.value)
                                }
                                /> 
                                <br />
                                <br />
                        
                                <br />
                                <br />
                        
                                <button type="submit"><a href="#"><b>Submit</b></a></button>
                        
                                <br />
                                <br />
                            </form>
                        </div>
                    </div>
                    <div style={{width: "50%", padding: "2%"}}>
                    {/* <div> */}
                        <img src={Vote} alt="team meeting" style={{borderRadius: "50px"}}/>
                    {/* </div> */}
                    </div>
                </div>
                {/* </div> */}
            </div>

            <div id="services" class="our-services section" style={{display: "flex", flexDirection: "row", marginLeft: "10%", marginRight: '10%', paddingLeft: "50", paddingRight: "50", marginTop: "-10%"}}>
                <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                    <div class="section-heading">

                        {/* <h2>The waiting time at your polling location <em>{message}</em> is approximately {<span>{Data.estimatedTime}</span>}<span> minutes</span></h2> */}
                        <h2>The waiting time at your polling location <span>{message}</span> is approximately {<em>{timeLive}</em>} minutes</h2>


                        <p>Plan your trip to the polls by confirming your polling location, securing the appropriate documents/identification, and ensuring you can make it to the polls on time. Learn more about your voting rights in Minnesota: <a href='https://www.sos.state.mn.us/elections-voting/election-day-voting/know-your-rights/' target="_blank">https://www.sos.state.mn.us/elections-voting/election-day-voting/know-your-rights/</a>.</p>
                        
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                        <div class="first-bar progress-skill-bar">
                            <h4>Approximate Wait Time</h4>
                            {<span>{timeLive} minutes</span>}
                            <div class="filled-bar" style={{width: "{timeLive}%"}}></div>
                            <div class="full-bar"></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div> 

            <div id="portfolio" class="our-portfolio section" style={{ paddingLeft: "50", paddingRight: "50", marginTop: "0%", marginBottom: "0%", marginLeft: "20%", marginRight: "20%"}}>
                <div class="container" style={{backgroundColor: '#FAFAFA', borderRadius: '40px', padding: '40px'}}>
                <div class="row">
                    <div class="col-lg-8 offset-lg-2" style={{ display: "flex", flexDirection: "row", marginLeft: "10%", marginRight: '10%'}}>
                    <div class="section-heading ">
                        <h2>Instructions<br/><em>Voting Information </em></h2>
                        <h4>1. Find your voting/polling location</h4>
                        <p>Minnesota Polling Place Finder: <a href="https://pollfinder.sos.state.mn.us/" target="_blank">https://pollfinder.sos.state.mn.us/</a></p><br/><br/>

                        <h4>2. Copy the address of your voting location</h4>
                        <p>See the example image below</p>
                        <img src={SearchAddress} alt="" style={{borderRadius: '20px'}}/><br/><br/><br/>

                        <h4>3. Paste the address of your voting location in VoteTracker to see approximate wait times</h4>
                        <p>TIME2VOTE allows you to see approximate waiting times at your voting location in real time, so you can decide when it's time to head to the polls and vote!</p><br/><br/>

                        <h4>4. Plan your trip to the polls!</h4>
                        <p>Voting hours: <a href="https://www.sos.state.mn.us/elections-voting/election-day-voting/voting-hours/" target="_blank">https://www.sos.state.mn.us/elections-voting/election-day-voting/voting-hours/</a></p>
                        <p>What to bring: <a href="https://www.sos.state.mn.us/elections-voting/election-day-voting/do-i-need-to-bring-id/" target="_blank">https://www.sos.state.mn.us/elections-voting/election-day-voting/do-i-need-to-bring-id/</a></p>
                        
                        
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div style={{textAlign: 'center', paddingLeft: "50", paddingRight: "50", marginTop: "0%", marginBottom: "0%", marginLeft: "20%", marginRight: "20%"}}>
                <h2 style={{fontSize: "96px", color: "#8ddbff"}}>T<span style={{color: "#000000"}}>2</span><span style={{color: "#fb8888"}}>V</span></h2>
            </div>
        </div>
    )
  }

  