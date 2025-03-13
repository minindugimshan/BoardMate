import React from 'react'
import './Support.css'

import {Mail, Phone, Text, Lightbulb, MessageCircle} from 'lucide-react';

function Support() {
  return (
    <div className='background'>
        <div className='supportBackground'>
          <div className='image-container'>
            <img src="/support page icon1.png" alt="" />
            <h2 className='text-overlay'>How It Works
              <span className='sub-text'> <br /> We are with you at every step of your journey! <br /><br /></span>
              <span className='seconde-sub-text'>Know how BoardMate works! <Lightbulb size={30} color='white' /></span>
            </h2>
          </div>
        </div>

        <div className='cards'>
          <div className='discover'>
            <img src="./real-estate-searching.png" alt="" />
            <div className='content'>
              <h2 className='discover-topic'>Discover</h2>
              <p className='discover-para'>
                Discover from a range of properties provided on our website.
                Choose your home according to your needs. <br />
                If you are not satisfied with the listings given on our website, <br />
                we will find properties according to your preferences.
              </p>
            </div>
          </div>
          <br />

          <div className='discover'>
            <img src="./book-now.png" alt="" />
            <div className='content'>
              <h2 className='discover-topic'>Finalize Your Place</h2>
              <p className='discover-para'>
                Book an appointment and directly contact the landlord to have a virtual tour of property. <br />
                Once you get all the details regarding the rent, surrounding area, and other relevant information <br />
                you want to know, finalize your property.
              </p>
            </div>
          </div>
          <br />

          <div className='discover'>
            <img src="./paperwork1.png" alt="" />
            <div className='content'>
              <h2 className='discover-topic'>Get Your Paperwork Done</h2>
              <p className='discover-para'>
                After finalizing your property with the landlord, we'll start the paperwork for you. <br />
                Paperwork includes signing of your agreement and etc. It may involve payment for the 
                first month (or first few months) which is the "key money" and other charges like application fees.
              </p>
            </div>
          </div>
          <br />



        </div>

    </div>
  )
}

export default Support