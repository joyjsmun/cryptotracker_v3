import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components"

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
    total_supply:number
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
    display: flex;
    align-items: center;
    justify-content: center;
   
`

const Button = styled.button`
    border: none;
    background-color: ${props => props.theme.blockColor};
    color:${props => props.theme.bgColor};
    width: 43vw;
    padding: 12px 20px;
    border-radius: 17px;
    margin: 15px 5px ;
`

function Coin(){
    const [info,setInfo] = useState<InfoData>()
    const [price,setPrice] = useState<PriceData>()
    const {coinId} = useParams()
    const location = useLocation() as RouteParams

    useEffect(()=>{
        fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        .then(res => res.json())
        .then(json => setInfo(json))
    },[])

    useEffect(()=> {
        fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
        .then(res => res.json())
        .then(json => setPrice(json))
    },[])

    return (
        <Container>
            <Header>
              <Title>{location?.state || "Loading..."}</Title>
            </Header>
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
                <Button>Chart</Button>
                <Button>Price</Button>
            </Tab>
        </Container>
    )
}


export default Coin;