import React from 'react'
import { Container } from 'react-bootstrap'
import Carousel from './Carousel'
function Banner() {
  return (
    <>
      <div className="banner">
        <div className="bannerInfo text-center">
          <h2
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'Montserrat',
            }}
          >
            CRYPTO PULSE
          </h2>
          <p
            style={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Get all the Info regarding your favorite Crypto Currency{' '}
          </p>
        </div>
        <Carousel/>
      </div>
    </>
  )
}

export default Banner
