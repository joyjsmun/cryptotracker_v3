import { useQuery } from "react-query"
import { fetchChart } from "../api"

interface ChartProps{
    coinId:string
}

function Chart({coinId}:ChartProps){
    const {isLoading,data} = useQuery(["ohlcv",coinId],()=> fetchChart(coinId))

    return <h1>Chart</h1>
}

export default Chart