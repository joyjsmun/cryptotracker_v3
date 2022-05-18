import { useParams } from "react-router-dom"

function Coin(){
    const {coinId} = useParams()
    
    return <h1>{coinId ? coinId : "...Loading"}</h1>
}


export default Coin