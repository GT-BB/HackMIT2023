import React, { Component } from 'react';
import './app.css';


export default () => {

    return (
        <div>
            <div id="contact" class="contact-us section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 align-self-center" >
                        <div class="section-heading">
                            <h2>Contact Us Now</h2>
                            <p>Let us know how we're doing, or of any updated waiting times</p>
                            <div class="phone-info">
                            <h4>For any enquiry, Call Us: <span><i class="fa fa-phone"></i> <a href="#">404-894-2000</a></span></h4>
                            </div>
                        </div>
                        </div>
                        <div class="col-lg-6" >
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
                                    <textarea name="message" type="text" class="form-control" id="message" placeholder="Message" required=""/></textarea>  
                                    </fieldset>
                                </div>
                                <div class="col-lg-12">
                                    <fieldset>
                                    <button type="submit" id="form-submit" class="main-button ">Send Message</button>
                                    </fieldset>
                                </div>
                                </div>
                                <div class="contact-dec">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }