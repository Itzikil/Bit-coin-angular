import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  // constructor(private http: HttpClient) { }
  constructor(private http: HttpClient) { }


  getRate(coins: string) {
    // return this.http.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    // console.log(this.http.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`).pipe(res=>res));
    
      // .pipe(map(res => res
      // ))
    // const res = this.http.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    // return console.log(res);

    // return res.data
  }

  // getMarketPrices() {
  //   const url = 'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
  //   return this.http.get<{ values: Value[] }>(url)
  //     .pipe(map(res => {
  //       const chartData: ChartData = { data: [], labels: [] }
  //       const marketPrices = res.values.slice(0, 25)
  //       marketPrices.forEach((d: Value) => {
  //         chartData.data.push(d.y)
  //         chartData.labels.push(this.getDate(d.x))
  //       })
  //       return chartData
  //     }))
  // }
}
