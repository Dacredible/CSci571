//
//  WebService.swift
//  Stock Search
//
//  Created by David on 11/23/17.
//  Copyright © 2017 Jikun. All rights reserved.
//

import Foundation
import Alamofire
import SwiftyJSON

class WebService {
    let BASE_URL: String?
    let stockData = StockData()
    
    init() {
        self.BASE_URL = "http://stocksearch.us-east-2.elasticbeanstalk.com/api/ios/"
//        self.BASE_URL = "http://0.0.0.0:3000/api/ios"
    }
    
    func getPriceTable(symbol: String, completion: @escaping (StockData?) -> Void ) {
        let url = "\(self.BASE_URL!)pricetable?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let jsonDic = response.result.value as? [String: Any]{
                guard jsonDic["Error Message"] == nil else{
                    completion(nil)
                    return
                }
                self.stockData.setPriceTable(jsonDic)
                completion(self.stockData)
            } else {
                completion(nil)
            }
        }
    }
    
    func getPriceChart(symbol: String, completion: @escaping (StockData?) -> Void ){
        let url = "\(self.BASE_URL!)pricechart?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let data = response.data {
                let json = JSON(data: data)
                guard json["Error Message"] == JSON.null else{
                    completion(nil)
                    return
                }
                self.stockData.setPriceChart(json)
                completion(self.stockData)
            } else {
                completion(nil)
            }
        }
    }
    
    func getHistChart(symbol: String, completion: @escaping (StockData?) -> Void ){
        let url = "\(self.BASE_URL!)histchart?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let data = response.data {
                let json = JSON(data: data)
                guard json["Error Message"] == JSON.null else{
                    completion(nil)
                    return
                }
                self.stockData.setHistChart(json)
                completion(self.stockData)
            } else {
                completion(nil)
            }
        }
    }
    
    func getSMA(symbol: String, completion: @escaping (StockData?) -> Void ){
        let url = "\(self.BASE_URL!)sma?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let data = response.data {
                let json = JSON(data: data)
                guard json["Error Message"] == JSON.null else{
                    completion(nil)
                    return
                }
                self.stockData.setSMA(json)
                completion(self.stockData)
            } else {
                completion(nil)
            }
        }
    }
    
    func getEMA(symbol: String, completion: @escaping (StockData?) -> Void ){
        let url = "\(self.BASE_URL!)ema?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let data = response.data {
                let json = JSON(data: data)
                guard json["Error Message"] == JSON.null else{
                    completion(nil)
                    return
                }
                self.stockData.setEMA(json)
                completion(self.stockData)
            } else {
                completion(nil)
            }
        }
    }
    
    func getRSI(symbol: String, completion: @escaping (StockData?) -> Void ){
        let url = "\(self.BASE_URL!)rsi?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let data = response.data {
                let json = JSON(data: data)
                guard json["Error Message"] == JSON.null else{
                    completion(nil)
                    return
                }
                self.stockData.setRSI(json)
                completion(self.stockData)
            } else {
                completion(nil)
            }
        }
    }
    
    func getSTOCH(symbol: String, completion: @escaping (StockData?) -> Void ){
        let url = "\(self.BASE_URL!)stoch?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let data = response.data {
                let json = JSON(data: data)
                guard json["Error Message"] == JSON.null else{
                    completion(nil)
                    return
                }
                self.stockData.setSTOCH(json)
                completion(self.stockData)
            } else {
                completion(nil)
            }
        }
    }
    
    func getADX(symbol: String, completion: @escaping (StockData?) -> Void ){
        let url = "\(self.BASE_URL!)adx?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let data = response.data {
                let json = JSON(data: data)
                guard json["Error Message"] == JSON.null else{
                    completion(nil)
                    return
                }
                self.stockData.setADX(json)
                completion(self.stockData)
            } else {
                completion(nil)
            }
        }
    }
    
    func getCCI(symbol: String, completion: @escaping (StockData?) -> Void ){
        let url = "\(self.BASE_URL!)cci?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let data = response.data {
                let json = JSON(data: data)
                guard json["Error Message"] == JSON.null else{
                    completion(nil)
                    return
                }
                self.stockData.setCCI(json)
                completion(self.stockData)
            } else {
                completion(nil)
            }
        }
    }
    
    func getBBANDS(symbol: String, completion: @escaping (StockData?) -> Void ){
        let url = "\(self.BASE_URL!)bbands?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let data = response.data {
                let json = JSON(data: data)
                guard json["Error Message"] == JSON.null else{
                    completion(nil)
                    return
                }
                self.stockData.setBBANDS(json)
                completion(self.stockData)
            } else {
                completion(nil)
            }
        }
    }
    
    func getMACD(symbol: String, completion: @escaping (StockData?) -> Void ){
        let url = "\(self.BASE_URL!)macd?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let data = response.data {
                let json = JSON(data: data)
                guard json["Error Message"] == JSON.null else{
                    completion(nil)
                    return
                }
                self.stockData.setMACD(json)
                completion(self.stockData)
            } else {
                completion(nil)
            }
        }
    }
    
    func getNews(symbol: String, completion: @escaping (StockData?) -> Void ){
        let url = "\(self.BASE_URL!)news?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let jsonDic = response.result.value as? [[String: Any]]{
                self.stockData.setNews(jsonDic)
                completion(self.stockData)
            } else {
                completion(nil)
            }
        }
    }
    
    func getFavItem(symbol: String, completion: @escaping (FavoriteItem?) -> Void ){
        var favItem = FavoriteItem()
        let url = "\(self.BASE_URL!)pricetable?stockSymbol=\(symbol)"
        Alamofire.request(url).responseJSON { response in
            if let jsonDic = response.result.value as? [String: Any]{
                guard jsonDic["Error Message"] == nil else{
                    completion(nil)
                    return
                }
                favItem.symbol = (jsonDic["Stock Ticker Symbol"] as! String)
                favItem.price = (jsonDic["Last Price"] as! String)
                let changeStr = jsonDic["Change"] as! String
                favItem.change = (changeStr.replacingOccurrences(of: "\\((.*?)\\)", with: "", options: .regularExpression))
                let range = changeStr.range(of: "\\((.*?)\\)", options: .regularExpression)
                favItem.change_percent = String(changeStr[range!])
                completion(favItem)
            } else {
                completion(nil)
            }
        }
        

    }
    
    
    static func getAutoComplete(input: String, completion: @escaping ([String]) -> Void) {
        var resultArr = [String]()
        var count = 0
        let url = "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=\(input)"
        Alamofire.request(url).responseJSON { (response) in
            if let data = response.data {
                let json = JSON(data: data)
                if let items = json.array {
                    for item in items {
                        count = count + 1
                        let name = item["Name"].rawString()
                        let exchange = item["Exchange"].rawString()
                        let symbol = item["Symbol"].rawString()
                        let result = "\(symbol!) - \(name!) (\(exchange!))"
                        resultArr.append(result)
                        if count >= 5 {
                            break
                        }
                    }
                }
                completion(resultArr)
            }
        }
    }
    
}
