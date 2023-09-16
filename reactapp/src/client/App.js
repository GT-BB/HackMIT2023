import React, { Component, useState } from 'react';
import './app.css';
import './animate.css';
import Header from './Header';
import AboutPage from './About';
import Main from './Main';
// import Contact from './Contact';
import Footer from './Footer';


import TeamImage from './media/hackgt.png';
import ReactImage from './media/react.png';


export default class App extends Component {
  state = { username: null};
  

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <WebApp />
      // // <div>

        
      //   {/* <p>helloooooooooooooooooo</p>
      //   {username ? <h1>{`Hello ${username} uwu`}</h1> : <h1>Loading.. please wait!</h1>} */}
      //   {/* <Header></Header>
      //   <AboutPage></AboutPage>
      //   <Main></Main> */}
      //   {/* <Contact></Contact> */}
      //   {/* <Footer></Footer> */}
      // // </div>
    );
  }
}

const WebApp = () => {

  const [tab, setTab] = useState(0);

  const switchTab = (newTab) => {
    setTab(newTab);
  }

  return (
      <div>        
      
      <Header changeTab={switchTab} currentTab={tab} />
      {tab == 1 && <AboutPage />}
      {tab == 0 && <Main />}
      <Footer></Footer>
    </div>
  );
}