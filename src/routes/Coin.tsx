import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useMatch } from "react-router-dom"
import { Route, Routes, useLocation, useParams } from "react-router-dom"
import styled from "styled-components"
import Chart from "./Chart"
import Price from "./Price"

interface RouteParams{
    state:string
}

interface InfoData {
    id:string,
    name:string,
    symbol:string,
    rank:number,
    description:string,
    open_source:boolean
}

interface PriceData{
    max_supply:number,
    total_supply:number,
    quotes: {
        USD: {
            price:number,
            volume_24h:number,
            volume_24h_change_24h:number,
            market_cap:number,
            market_cap_change_24h:number,
            percent_change_15m:number,
            percent_change_30m:number,
            percent_change_1h:number,
            percent_change_6h:number,
            percent_change_12h:number,
            percent_change_24h:number,
            percent_change_7d:number,
            percent_change_30d:number,
            percent_change_1y:number,
            ath_price:number,
            ath_date:string,
            percent_from_price_ath:number
        }
    }

}


const Container = styled.div`
  padding: 0px 20px;
  max-width: 430px;
  margin: 0 auto;
`
const Header = styled.header`
    height: 100px;
    color: #fafab2;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    font-size: x-large;
    text-align: center;
`
const Detail = styled.div`
    font-size: small;
   
`
const Block = styled.div`
    display: flex;
    padding: 10px;
    border-radius: 25px;
    background-color: ${props => props.theme.blockColor};
    align-items: center;
    justify-content: space-around;
    text-align: center;
    line-height: 24px;
`

const Info = styled.div`
    padding: 15px;
    color: ${props => props.theme.blockColor};
`

const Tab = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
   
`

const Button = styled.button<{isActive:boolean}>`
    border: none;
    background-color: ${props => props.theme.blockColor};
    color:${props => props.isActive ? "blue" : props.theme.fontColor};
    font-weight: ${props => props.isActive ? 700 : null};
    width: 10vw;
    padding: 7px 0px;
    border-radius: 17px;
    margin: 15px 5px ;
    :hover{
        background-color: yellow;
    }


`

function Coin(){
    const [loading,setLoading] = useState(true)
    const [info,setInfo] = useState<InfoData>()
    const [price,setPrice] = useState<PriceData>()
    const {coinId} = useParams()
    const location = useLocation() as RouteParams
    const chartMatch = useMatch("/:coinId/chart")
    const priceMatch = useMatch("/:coinId/price")

    useEffect(()=>{
        fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        .then(res => res.json())
        .then(json => setInfo(json))
        setLoading(false)
    },[])

    useEffect(()=> {
        fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
        .then(res => res.json())
        .then(json => console.log(json))
        setLoading(false)
    },[])

    return (
        <Container>
            <Header>
            <Title>
             {location?.state ? location.state : loading ? "Loading..." : info?.name}
             </Title>
            </Header>
            {loading ? "loading..." : (
                <>
                <Detail>
                <Block>
                    <span><p>Rank</p><p>{info?.rank}</p></span>
                    <span><p>Symbol</p><p>{info?.symbol}</p></span>
                    <span><p>Open Source</p><p>{info?.open_source ? "Yes" : "No"}</p></span>
                </Block>
                <Info>{info?.description}</Info>
                    <Block>
                    <span><p>Total Supply</p><p>{price?.max_supply}</p></span>
                    <span><p>Max Supply</p><p>{price?.total_supply}</p></span>
                </Block>
            </Detail>
                <Tab>
                    <Link to={`/${coinId}/chart`}><Button isActive={chartMatch !==null }>Chart</Button></Link>
                    <Link to={`/${coinId}/price`}><Button isActive={priceMatch !==null }>Price</Button></Link>
                </Tab>
            <Routes>
                <Route path="chart" element={<Chart/>}/>
                <Route path="price" element={<Price />} />
            </Routes>
            </>
            )}
        </Container>
    )
}


export default Coin;