import React, { Component } from 'react';
import './app.css';
import Logo from './media/logo.png';


export default ({ changeTab, currentTab }) => {

    return (
        <div>
        <header class="header-area header-sticky" style={{position: "sticky"}}>
            <div class="container">
                <div class="row">
                    <div class="col-12" style={{display: "flex"}}>
                    <nav class="main-nav" style={{flexDirection: "row", marginLeft: "15%", marginRight: "15%"}}>
                        
                        <a href="index.html" class="logo" style={{textAlign: 'left'}}>
                        <h4>TIME<span style={{color: "#000000"}}>2</span><span>VOTE</span></h4>
                        </a>
                        
                        <ul class="nav" style={{position: "absolute", right: "0", marginRight: "15%"}}>
                        <li class="scroll-to-section"><a href="#" class={currentTab == 0 && "active"} onClick={() => changeTab(0)}>Home</a></li>
                        {/* <li class="scroll-to-section"><a href="#portfolio">Instructions</a></li> */}
                        <li class="scroll-to-section"><a href="#" class={currentTab == 1 && "active"} onClick={() => changeTab(1)}>About Us</a></li>
                        <li class="scroll-to-section"><div class="main-red-button"><a href="index.html#portfolio">Instructions</a></div></li> 
                        </ul>        
                        <a class='menu-trigger'>
                            <span>Menu</span>
                        </a>
                        
                    </nav>
                    </div>
                </div>
            </div>
        </header>
        </div>
    )
  }