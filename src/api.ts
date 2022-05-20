export function fetchCoins(){
    return  fetch("https://api.coinpaprika.com/v1/coins").then(response => 
    
    response.json())
}


export function fetchInfo(coinId:string){
    return  fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(res => res.json())
}

export function fetchPrice(coinId:string){
    return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then(res => res.json())
}

export function fetchChart(coinId:string){
    const endDate = Math.floor(Date.now()/1000);
    const startDate = endDate - 60*60*24*7*2;
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(res => res.json())
}