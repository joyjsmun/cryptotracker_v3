import { useLocation } from "react-router-dom"
import styled from "styled-components"

interface RouteParams{
    state:string
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
    background-color: white;
`
const Block = styled.div`
    display: flex;
    height: 20vh;
    border-radius: 25px;
    background-color: ${props => props.theme.blockColor};
`

const Info = styled.div`
    height: 20vh;
`



function Coin(){
    const location = useLocation() as RouteParams

    return (
        <Container>
            <Header>
              <Title>{location?.state || "Loading..."}</Title>
            </Header>
            <Detail>
                <Block>
                    <span><p>Rank</p><p>1</p></span>
                    <span><p>Symbol</p><p>1</p></span>
                    <span><p>Open Source</p><p>1</p></span>
                </Block>
                <Info></Info>
                <Block>
                    <span><p>Total Supply</p><p>1</p></span>
                    <span><p>Max Supply</p><p>1</p></span>
                </Block>
            </Detail>
        </Container>
    )
}


export default Coin;