import { useEffect, useState } from "react"
import styled from "styled-components"


interface ICoins{
    name:string
}

const Container = styled.div``

const Header = styled.header``

const Title = styled.h1``

const CoinList = styled.ul``

const Coin = styled.li``

 function Coins(){
     const [coins,setCoins] = useState<ICoins[]>([])

     useEffect(()=>{
        fetch("https://api.coinpaprika.com/v1/coins")
        .then(response => response.json())
        .then(json => setCoins(json.slice(0,100)))
     })
     
    return (
    <Container>
        <Header>
            <Title>Coin Tracker v3</Title>
        </Header>
        <CoinList>
            {coins.map(coin => <Coin>{coin.name}</Coin>)}
        </CoinList>
    </Container>
    )
}

export default Coins