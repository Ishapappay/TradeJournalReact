import { useState, useEffect, React } from "react"
import { Link, useNavigate } from "react-router-dom";
import { getAllTrade, deleteTrade } from '../services/trade-service';

function Trades() {
    const [Trades, setTrades] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTrade();
    }, []);

    async function fetchTrade() {
        try {
            const result = await getAllTrade();
            setTrades(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleUpdateTrade = (selectedTrade) => {        
        navigate(`/AddNewTrade/${selectedTrade.id}`, { state: { trade: selectedTrade } });
    };

    async function handleDeleteTrade(id) {
        try {
            const isConfirmed = window.confirm('Are you sure you want to delete this item?');
            if (isConfirmed) {
                const result = await deleteTrade(id);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        fetchTrade();
    }

    return (
        <div>
            <div className="col-12">
                <Link to="/AddNewTrade/0">Add new Trade</Link>
            </div>
            <div className="portfolio-table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Trade</th>
                            <th> </th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Stoploss</th>
                            <th>Entry Date</th>
                            <th className="hide-column">Strategy</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ((Trades != null && Trades.length > 0) ?
                                Trades.map((Trade, index) => {                                    
                                    return (
                                        <tr key={index}>
                                            <td> {Trade.code}</td>
                                            <td>{(Trade.action === 0) ? `Buy` : `Sell`}</td>
                                            <td>{Trade.price}</td>
                                            <td>{Trade.quantity}</td>
                                            <td>{Trade.stopLoss}</td>
                                            <td>{Trade.entryDate}</td>
                                            <td className="hide-column">{Trade.strategyId}</td>
                                            <td>
                                                <i class="bi bi-pencil" onClick={() => handleUpdateTrade(Trade)}></i>
                                            </td>
                                            <td>
                                                <i class="bi bi-trash" onClick={() => handleDeleteTrade(Trade.id)}></i>
                                            </td>
                                        </tr>
                                    )
                                }) : <tr><td colSpan={4}>No data !!</td></tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Trades