import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"


interface ICoins{
    name:string
    id:string
    symbol:string
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 430px;
  margin: 0 auto;
`
const Header = styled.header`
    height: 100px;
    color: ${props => props.theme.blockColor};
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    font-size: x-large;
    text-align: center;
`

const CoinList = styled.div``

const Coin = styled.li`
   color: ${props => props.theme.fontColor};
    list-style-type: none;
    height: 50px;
    background-color: ${props => props.theme.blockColor};
    margin: 10px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-radius: 15px;
    :hover{
        background-color: yellow;
        transition: 0.5s linear;
    }
`

const Symbol = styled.img`
    width: 20px;
    margin-right: 3px;
`

 function Coins(){
     const [coins,setCoins] = useState<ICoins[]>([])

     useEffect(()=>{
        fetch("https://api.coinpaprika.com/v1/coins")
        .then(response => response.json())
        .then(json => setCoins(json.slice(0,100)))
     })

     console.log(coins)
     
    return (
    <Container>
        <Header>
            <Title>Coin Tracker</Title>
        </Header>
        <CoinList>
            {coins.map(coin => <Link to={`/${coin.id}`} state={`${coin.name}`}><Coin><Symbol src={`https://coinicons-api.vercel.app/api/icon/${coin?.symbol.toLowerCase()}`} />{coin.name} &rarr;</Coin></Link>)}
        </CoinList>
    </Container>
    )
}

export default Coins