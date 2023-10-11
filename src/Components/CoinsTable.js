import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { TextField, Typography, createTheme } from '@mui/material'
import { Container, ThemeProvider } from 'react-bootstrap'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { Navigate } from 'react-router-dom'
import { Classnames } from 'react-alice-carousel'
import { numberWithCommas } from './Banner/Carousel'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { makeStyles } from 'tss-react/mui'

/*
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
*/

function CoinsTable() {
  const { currency, symbol } = CryptoState()
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    setCoins(data)
    console.log(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCoins()
  }, [currency])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#aaa',
      },
      type: 'dark',
    },
  })

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    )
  }

  const useStyles = makeStyles()((theme) => {
    return {
      root: {
        color: theme.palette.primary.main,
      },
      row: {
        
        backgroundColor: '#16171a',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#131111',
        },
        fontFamily: 'Montserrat',
      },
      apply: {
        marginRight: theme.spacing(2),
      },
      pagination: {
        '& .MuiPaginationItem-root': {
          color: 'gold',
        },
        row: {
          backgroundColor: '#16171a',
       
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#131111',
          },
          fontFamily: 'Montserrat',
        },
      },
    }
  })
  const { classes } = useStyles()
  return (
    <>
      <div>
        <ThemeProvider theme={darkTheme}>
          <Container className="" style={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              style={{ margin: 18, fontWeight: 900, fontFamily: 'Montserrat' }}
            >
              Explore Any Cryptocurrency Asset to View Its Current Price and
              Market Capitalization on Our Crypto Tracking Website.
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="secondary"
              style={{
                marginBottom: 20,
                color: 'white',
                width: '100%',
                border: 0,
              }}
              label="Search For A CryptoCurrency..."
              onChange={(e) => setSearch(e.target.value)}
            />

            <TableContainer
              style={{ backgroundColor: 'black' }}
              component={Paper}
            >
              {loading ? (
                <LinearProgress style={{ backgroundColor: 'gold' }} />
              ) : (
                <Table aria-label="simple table">
                  <TableHead style={{ backgroundColor: '#EEBC1D'}}>
                <TableRow>
                      {['Coin', 'Price', '24h Change', 'Market Cap'].map(
                        (head) => (
                          <TableCell
                            style={{
                              color: 'black',
                              fontWeight: '700',
                              fontFamily: 'Montserrat',
                            }}
                            key={head}
                            align={head === 'Coin' ? '' : 'right'}
                          >
                            {head}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {handleSearch()
                      .slice((page - 1) * 5, (page - 1) * 5 + 5)
                      .map((row) => {
                        const profit = row.price_change_percentage_24h > 0
                        return (
                          <TableRow
                            onClick={() => Navigate(`/coins/${row.id}`)}
                            key={row.name}
                            className={classes.row}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                display: 'flex',
                                gap: 15,
                              }}
                            >
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="50"
                                style={{ marginBottom: 10 }}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: 'uppercase',
                                    fontSize: 22,
                                    color: 'white',
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span style={{ color: 'darkgrey' }}>
                                  {row.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell align="right" style={{ color: 'white' }}>
                              {symbol}{' '}
                              {numberWithCommas(row.current_price.toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{
                                color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                                fontWeight: 500,
                              }}
                            >
                              {profit && '+'}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>
                            <TableCell align="right" style={{ color: 'white' }}>
                              {symbol}{' '}
                              {numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )}
                              M
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
            <Stack>
              <Pagination
                style={{
                  color: 'white',
                  padding: 20,
                  display: 'flex',
                  justifyContent: 'center',
                }}
                count={(handleSearch()?.length / 10).toFixed(0)}
                color="primary"
                classes={{ ul: classes.pagination }}
                onChange={(_, value) => {
                  setPage(value)
                  window.scroll(0, 450)
                }}
              />
            </Stack>
          </Container>
        </ThemeProvider>
      </div>
    </>
  )
}

export default CoinsTable
