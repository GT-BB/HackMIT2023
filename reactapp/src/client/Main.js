import React, { useState, Component, useEffect } from 'react';
import './app.css';
// import BannerImage from './media/bannerimg.png';
import QR from './media/clearqr.png';
import LightHouse from './media/lighthouse.png';
import SearchAddress from './media/search-address.png';
import BannerImg from './media/banner.png';
import Data from './estimatedTime.json';
import hazardPin from './media/hazardpoint.png';
import mapPins from './media/mappins.png';
import route from './media/route.png';



export default () => {

    // FORM ONE - resource
    const [rname, rsetName] = useState('');
    const [rZip, rSetZip] = useState('');
    const [rCoors, rSetCoors] = useState('');
    const [rType, rSetType] = useState('');


    // Send to Fetch to API for resource form
    const handleSubmit1 = (event) => {
        event.preventDefault();

        // Create a data object with the form values
        const data = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                "resource": rname,
                "zip": rZip,
                "coors": rCoors,
                "type": rType})
        };

        // Send a POST request to your server
        fetch('http://127.0.0.1:5000', data)
        
        .then((response) => {
            if (response.ok) {
                // Request was successful, you can handle the response here
                console.log('Request was successful');
            } else {
                // Handle the error here
                console.error('Request failed');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // Clear the form fields
        rsetName('');
        rSetZip('');
        rSetCoors('');
        rSetType('');
    };

    // FORM TWO - hazrard
    const [hname, hsetName] = useState('');
    const [hZip, hSetZip] = useState('');
    const [hCoors, hSetCoors] = useState('');
    const [radius, setRadius] = useState('');


    // Send to Fetch to API for HAZARD form
    const handleSubmit2 = (event) => {
        event.preventDefault();

        // Create a data object with the form values
        const data = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                "hazard": hname,
                "zip": hZip,
                "coors": hCoors,
                "radius": radius})
        };

        // Send a POST request to your server
        fetch('http://127.0.0.1:5000', data)
        
        .then((response) => {
            if (response.ok) {
                // Request was successful, you can handle the response here
                console.log('Request was successful');
            } else {
                // Handle the error here
                console.error('Request failed');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // Clear the form fields
        hsetName('');
        hSetZip('');
        hSetCoors('');
        setRadius('');
    };

    // const [address, setAddress] = useState('');
  
    // const [message, setMessage] = useState('');

    // const [timeLive, setTimeLive] = useState(0);

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

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    
    //     setMessage(`${address}`);
    //     setAddress('');
        
    //   };

      
    
      function Dashpage(){
        return(
        <h2>{message}</h2>
        );
      }

    return (
        <div styles={{display: "flex"}}>
            <div class="main-banner" id="top" style={{ display: "flex", paddingLeft: "50", paddingRight: "50", marginTop: "0%", marginLeft: '10%', marginRight: '10%', marginBottom: '0'}}>
                {/* <div class="container"> */}

                <div style={{display: "flex",flexDirection: "row"}}>
                    <div style={{width: "50%", padding: "2%"}}>
                        <div class="left-content header-text">
                            <h2>SMS-Based Disaster<br></br> Relief Aid</h2><br></br>
                            <h3>LifeLine is an SMS-based platform for disaster relief organizations to connect people with resources they need most.</h3><br></br><br></br>
                            <h2>Text <span>HELP</span> to <span>+1 833 986 3290</span></h2>
                        </div>
                    </div>
                    <div style={{width: "50%", padding: "2%"}}>
                    {/* <div> */}
                        <img src={BannerImg} alt="team meeting" style={{borderRadius: "50px"}}/>
                    {/* </div> */}
                    </div>
                </div>
                {/* </div> */}
            </div>

            <div class="our-portfolio section" style={{flexDirection: "row", textAlign: 'center', width: '100%'}}>
                <div styles={{display: "inline"}}>
                <div class="container" style={{backgroundColor: '#FAFAFA', borderRadius: '40px', margin: '45px', paddingTop:"2%", paddingBottom: "2%", paddingLeft: "5%", marginRight: "20px", paddingRight: "5%", width: "35%", display: 'inline-block', margin: '0 auto'}}>
                    <h2>Submit a Resource</h2><br></br>
                    <form onSubmit={handleSubmit1}>
                        <label style={{margin: "3%"}} htmlFor="rname">Resource Name</label>
                        <input
                            style={{borderRadius: "5px", margin: "2%", padding: "1%", width: "100%"}}
                            label="Resource Name"
                            type="text"
                            id="rname"
                            name="rname"
                            value={rname}
                            // placeholder="Resource Name"
                            onChange={(event) => rsetName(event.target.value)}
                        /><br></br>
                        <label style={{margin: "3%"}} htmlFor="rZip">Zip Code</label>
                        <input
                            style={{borderRadius: "5px", margin: "2%", padding: "1%", width: "100%"}}
                            label="Zip"
                            type="text"
                            id="rZip"
                            name="rZip"
                            value={rZip}
                            // placeholder="Resource Name"
                            onChange={(event) => rSetZip(event.target.value)}
                        />
                        <br></br>
                        <label style={{margin: "3%"}} htmlFor="rCoors">Coordinates</label>
                        <input
                            style={{borderRadius: "5px", margin: "2%", padding: "1%",  width: "100%"}}
                            label="coors"
                            type="text"
                            id="rCoors"
                            name="rCoors"
                            value={rCoors}
                            // placeholder="Resource Name"
                            onChange={(event) => rSetCoors(event.target.value)}
                        />
                        <br></br>
                        <label style={{margin: "3%"}} htmlFor="rType">Resource Provided</label>
                        <input
                            style={{borderRadius: "5px", margin: "2%", padding: "1%",  width: "100%"}}
                            label="Resource Provided"
                            type="text"
                            id="rType"
                            name="rType"
                            value={rType}
                            // placeholder="Resource Name"
                            onChange={(event) => rSetType(event.target.value)}
                        />
                        <br />
                        <br />
                        
                        <br />
                        <br />

                        <button type="submit" id="mybutton">Submit</button>
                        
                        <br />
                        <br />
                    </form>
                </div>

                <div class="container" style={{backgroundColor: '#FAFAFA', borderRadius: '40px', margin: '45px', paddingTop:"2%", paddingBottom: "2%", marginRight: "20px", paddingLeft: "5%", paddingRight: "5%", width: "35%", display: 'inline-block', margin: '0 auto'}}>
                    <h2>Submit a Hazard</h2><br></br>
                    <form onSubmit={handleSubmit2}>
                        <label style={{margin: "3%"}} htmlFor="hname">Hazard Name</label>
                        <input
                            style={{borderRadius: "5px", margin: "2%", padding: "1%", width: "100%"}}
                            label="Hazard Name"
                            type="text"
                            id="hname"
                            name="hname"
                            value={hname}
                            // placeholder="Resource Name"
                            onChange={(event) => hsetName(event.target.value)}
                        /><br></br>
                        <label style={{margin: "3%"}} htmlFor="hZip">Hazard Zip Code</label>
                        <input
                            style={{borderRadius: "5px", margin: "2%", padding: "1%", width: "100%"}}
                            label="hZip"
                            type="text"
                            id="hZip"
                            name="hZip"
                            value={hZip}
                            // placeholder="Resource Name"
                            onChange={(event) => hSetZip(event.target.value)}
                        />
                        <br></br>
                        <label style={{margin: "3%"}} htmlFor="hCoors">Harzard Coordinates</label>
                        <input
                            style={{borderRadius: "5px", margin: "2%", padding: "1%",  width: "100%"}}
                            label="coors"
                            type="text"
                            id="hCoors"
                            name="hCoors"
                            value={hCoors}
                            // placeholder="Resource Name"
                            onChange={(event) => hSetCoors(event.target.value)}
                        />
                        <br></br>
                        <label style={{margin: "3%"}} htmlFor="radius">Hazard Radius</label>
                        <input
                            style={{borderRadius: "5px", margin: "2%", padding: "1%",  width: "100%"}}
                            label="Resource Provided"
                            type="text"
                            id="radius"
                            name="radius"
                            value={radius}
                            // placeholder="Resource Name"
                            onChange={(event) => setRadius(event.target.value)}
                        />
                        <br />
                        <br />
                        
                        <br />
                        <br />

                        <button type="submit" id="mybutton">Submit</button>
                        
                        <br />
                        <br />
                    </form>
                </div>
                </div>
            

            <div id="portfolio" class="our-portfolio section" style={{ paddingLeft: "10%", paddingRight: "10%", marginTop: "20px", marginBottom: "0px", marginLeft: "10%", marginRight: "10%"}}>
                <div class="container" style={{backgroundColor: '#FAFAFA', borderRadius: '40px', margin: '5%'}}>
                <div class="row">
                    <div class="col-lg-8 offset-lg-2" style={{padding: "7%", marginTop: "0px", marginBottom: "0px", display: "flex", flexDirection: "row", marginLeft: "40px", marginRight: '40px'}}>
                    <div class="section-heading ">
                        <h2><span>Text HELP to +18339863290</span> or <br></br> scan the QR code below</h2><br></br><br></br>
                        <img src={QR} alt="" style={{paddingLeft: '40%', paddingRight: '40%'}}/><br/><br/><br/>
  
                        <p style={{textAlign: "left"}}>LifeLine is a service that provides an essential line of communication during a natural disaster.  It connects these individuals and communities over SMS to nearby available resources. During a natural disaster, relief organizations can submit a resource to the LifeLine database.  People located nearby can search this database for resources they need, such as food, water, shelter, or medical assistance.  LifeLine will respond with a list of available resources, providing a set of walking directions navigating from their current location to the provided resource.
                        </p> <br></br> <br></br>

                        <p style={{textAlign: "left"}}><b>Users will be prompted with the following: </b><br></br><br></br>
                        "Enter your zip code, followed by the resource(s) you are interested in. Resources available: food, water, shelter, or medical."
                        <br></br>
                        For directions to the nearest resource, enter your location coordinates (can be found in Google Maps offline), the resource you wish to get to, and the word 'directions'."

                        <br></br><br></br>
                        When users send an SMS text containing a zip code and resource, our database will search for nearby locations where that resource is available, and Lifeline will send a list of resources, ordered by proximity.  If the users send a following message containing their location coordinates and directions, LifeLine will then send a message containing directions from the user's location to the resource's location.  Hazard zones can be submitted by those with access to Internet connection to this website.  LifeLine will alert users near the hazard zone and modify their directions via SMS to go around dangerous areas.
                        </p>


                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="container" style={{backgroundColor: '#FAFAFA', borderRadius: '40px', margin: '5%', paddingTop: "50px", paddingLeft: "15%", paddingRight: "15%", paddingBottom: "5%"}}>
                <h2>How the Algorithm Works</h2>
                <br></br>
                <p style={{textAlign: "left"}}>LifeLine obtains the user's location either by their zip code or their exact coordiantes, obtained offline via Google Maps.<br></br><br></br>
                The locations of additional resources available and hazard zones, including the areas affected, can be submitted by users through this website.  These submissions will update the LifeLine database in realtime.  Users 
                texting LifeLine will be alerted if they are near a hazard zone, and the directions to the nearest aid location will be modified to go around this danger.</p><br></br><br></br>
                <div style={{display: "flex", justifyContent: 'space-around'}}>
                    <br></br>
                <div><img src={mapPins} alt="" style={{margin: "10px",width: "400px", height: "300px", objectFit: "cover", borderRadius: "20px"}}/><br/><br/> <p>Locations of resources available on the island of Maui, Hawaii</p></div>
                <div><img src={hazardPin} alt="" style={{margin: "10px", width: "400px", height: "300px", objectFit: "cover", borderRadius: "20px"}}/><br/><br/> <p>Hazard zone submitted by website user</p></div>
                <div><img src={route} alt="" style={{margin: "10px", width: "400px", height: "300px", objectFit: "cover", borderRadius: "20px"}}/><br/><br/> <p>Redirected path around the hazard zone to the nearest aid location</p></div>
                </div>
            </div>
            <div style={{textAlign: 'center', paddingLeft: "50", paddingRight: "50", marginTop: "0%", marginBottom: "0%", marginLeft: "20%", marginRight: "20%"}}>
                <img src={LightHouse} alt="react" style={{paddingLeft: "40%", paddingRight: "40%", paddingBottom: "10%"}}/>  
            </div>
        </div>
        </div>
    )
  }
