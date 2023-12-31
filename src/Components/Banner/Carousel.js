import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel'
import { Row, Col, Card } from 'react-bootstrap'
import { Classnames } from 'react-alice-carousel'
import { green, red } from '@mui/material/colors'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const Carousel = () => {
  const [trending, setTrending] = useState([])
  const { currency, symbol } = CryptoState()

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))
    console.log(data)
    setTrending(data)
  }

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency])

  const items = trending.map((coin) => {
    let profit = coin.profit_change_percentage_24 >= 0
    return (
      <Link className={Classnames.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginTop: 40, position: 'relative' }}
        />
        <span className="priceChange btn btn-warning">
          {coin?.symbol}
          &nbsp;
          <span style={{ color: profit > 0 ? 'green' : 'red' }}>
            {profit && '+'} "{coin?.price_change_percentage_24h?.toFixed(2)}"%{' '}
          </span>
        </span>
        <span
          className="coinPrice btn btn-primary"
          style={{ fontSize: 22, fontWeight: 500 }}
        >
          {symbol}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
  })

  const responsive = {
    0: {
      items: 2,
    },
    250: {
      items: 2,
    },
    712: {
      items: 3,
    },
  }

  return (
    <Row className="mb-3">
      <Col>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          items={items}
          autoPlay
        />
      </Col>
    </Row>
  )
}

export default Carousel
