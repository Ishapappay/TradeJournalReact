import React, { useState,useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { getStock } from '../services/stock-service';



function TradeSearch() {
    const [action, setAction] = useState("");
    let { stock } = useParams();

    const [stockData, setStockData] = useState({ nse: null,bse: null, stockName: null,industry: null, closing: null,marketCap: null,wk52: null})

    useEffect(() => {
     debugger   
        if (stock !== "") {
            fetchTradeDetails();
        }      
    }, []);

    async function fetchTradeDetails() {
        try {
            debugger
            const trade = await getStock(stock);     
            setStockData({ ...stockData, nse: trade.NSECode,bse: trade.BSECode})      
        } catch (error) {
            console.error('Error fetching trade details:', error);
        }
    }

    return (
        <div>
            <div className="mb-3">               
                <Link to="/AddNewTrade/0">BUY</Link><br></br>
                <Link to="/AddNewTrade/0">SELL </Link>
            </div>
        </div>
    )
}
export default TradeSearch;


