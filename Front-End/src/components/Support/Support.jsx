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
        
    </div>
  )
}

export default Support