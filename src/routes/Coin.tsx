import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { useMatch } from "react-router-dom"
import { Route, Routes, useLocation, useParams } from "react-router-dom"
import styled from "styled-components"
import { fetchInfo, fetchPrice } from "../api"
import Chart from "./Chart"
import Price from "./Price"


interface RouteParam{
    coinId:string
}

interface RouteState{
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
    const {coinId} = useParams() 
    const location = useLocation() as RouteState
    const chartMatch = useMatch("/:coinId/chart")
    const priceMatch = useMatch("/:coinId/price")
    const {isLoading:infoLoading,data:coinInfo} = useQuery<InfoData>(["price",coinId],() => fetchInfo(coinId!))
    const {isLoading:priceLoading,data:priceInfo} = useQuery<PriceData>(["tickers",coinId],()=> fetchPrice(coinId!))


    const loading = infoLoading || priceLoading
  
    return (
        <Container>
            <Header>
            <Title>
             {location?.state ? location.state : loading ? "Loading..." : coinInfo?.name}
             </Title>
            </Header>
            {loading ? "loading..." : (
                <>
                <Detail>
                <Block>
                    <span><p>Rank</p><p>{coinInfo?.rank}</p></span>
                    <span><p>Symbol</p><p>{coinInfo?.symbol}</p></span>
                    <span><p>Open Source</p><p>{coinInfo?.open_source ? "Yes" : "No"}</p></span>
                </Block>
                <Info>{coinInfo?.description}</Info>
                    <Block>
                    <span><p>Total Supply</p><p>{priceInfo?.max_supply}</p></span>
                    <span><p>Max Supply</p><p>{priceInfo?.total_supply}</p></span>
                </Block>
            </Detail>
                <Tab>
                    <Link to={`/${coinId}/chart`}><Button isActive={chartMatch !==null }>Chart</Button></Link>
                    <Link to={`/${coinId}/price`}><Button isActive={priceMatch !==null }>Price</Button></Link>
                </Tab>
            <Routes>
                <Route path="chart" element={<Chart coinId={coinId as string}/>}/>
                <Route path="price" element={<Price />} />
            </Routes>
            </>
            )}
        </Container>
    )
}


export default Coin;