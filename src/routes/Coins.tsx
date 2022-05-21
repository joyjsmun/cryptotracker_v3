import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import styled from "styled-components"
import { fetchCoins } from "../api"
import { isDarkAtom } from "../atoms"



interface ICoins{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
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

const ButtonDiv = styled.div`
    display: flex;
    justify-content:center;
`

const Button = styled.div`
    background: ${props => props.theme.accentColor};
    padding: 10px;
    border-radius: 15px;
`

 function Coins(){
   const {isLoading,data} = useQuery<ICoins[]>("allCoins",fetchCoins)
   const setDarkMode = useSetRecoilState(isDarkAtom)
   const toggleMode = () => setDarkMode(prev =>!prev)

    return (
    <Container>
        <Header>
            <Title>Coin Tracker</Title>
        </Header>
         <ButtonDiv><Button onClick={toggleMode}>Toggle Theme Mode &#8618;</Button></ButtonDiv>
        {isLoading ? "...Loading" : 
        (<CoinList>
            {data?.slice(0,100).map((coin) => <Link to={`/${coin.id}`} state={`${coin.name}`}><Coin><Symbol src={`https://coinicons-api.vercel.app/api/icon/${coin?.symbol.toLowerCase()}`} />{coin.name} &rarr;</Coin></Link>)}
    </CoinList>)
        }
    </Container>
    )
}

export default Coins