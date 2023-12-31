import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { makeStyles } from 'tss-react/mui'
import CoinInfo from '../Components/CoinInfo'
import ReactHtmlParser from 'react'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import { numberWithCommas } from '../Components/Banner/Carousel'
import { SingleCoin } from '../config/api'

function CoinPage() {
  const { id } = useParams()
  const [coin, setCoin] = useState([])
  const { currency, symbol } = CryptoState()

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  }
  useEffect(() => {
    fetchCoin()
  }, [])

  const useStyles = makeStyles()((theme) => {
    return {
      container: {
        display: 'flex',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          alignItems: 'center',
        },
      },
      sidebar: {
        width: '30%',
        [theme.breakpoints.down('md')]: {
          width: '100%',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 25,
        borderRight: '2px solid grey',
      } /*
      heading: {
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Montserrat',
      },
      description: {
        width: '100%',
        fontFamily: 'Montserrat',
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: 'justify',
      },
      marketData: {
        alignSelf: 'start',
        padding: 25,
        paddingTop: 10,
        width: '100%',
        [theme.breakpoints.down('md')]: {
          display: 'flex',
          justifyContent: 'space-around',
        },
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          alignItems: 'center',
        },
        [theme.breakpoints.down('xs')]: {
          alignItems: 'start',
        },
      }, */,
    }
  })

  const { classes } = useStyles()
  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />
  return (
    <>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          sidebar
          <img
            src={coin?.image}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className={classes.heading}>
            {coin?.name}
          </Typography>
        </div>

        <CoinInfo coin={coin} />
      </div>
    </>
  )
}

export default CoinPage
