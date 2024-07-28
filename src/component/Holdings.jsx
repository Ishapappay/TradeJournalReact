import { React, useEffect, useState } from 'react'
import { getAllHoldings, getHolding } from '../services/holding-service';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'; 
import { Fragment } from 'react';


export const Holdings = () => {
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);
    const [Holdings, setHoldings] = useState([]);

    useEffect(() => {
        fetchHoldings();
    }, []);

    const handleRowClick = (index) => {
        setExpandedRowIndex(index === expandedRowIndex ? null : index);
    };

    async function fetchHoldings() {
        try {
            const result = await getAllHoldings();
            setHoldings(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div>
            <div className="portfolio-table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Stop loss</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ((Holdings != null && Holdings.length > 0) ?
                                Holdings.map((hold, index) => (
                                    <Fragment key={index}>
                                        <tr onClick={() => handleRowClick(index)}>
                                            <td>{hold.code}</td>
                                            <td>{hold.buyPrice}</td>
                                            <td>{hold.quantity}</td>
                                            <td>{hold.trailingStoploss}</td>
                                            <td>
                                                {expandedRowIndex === index ? (<MdKeyboardArrowUp />) : (<MdKeyboardArrowDown />)}
                                            </td>
                                        </tr>
                                        {expandedRowIndex === index && (
                                            <tr>
                                                <td colSpan="4">
                                                    <div>
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <td>Quantity </td>
                                                                    <td>Buy Price </td>
                                                                    <td>Stoploss </td>
                                                                    <td>Entry Date </td>
                                                                    <td>Description </td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {hold.trades.length > 0 ?
                                                                    (
                                                                        hold.trades.map((trade, innerIndex) => (
                                                                            <tr key={innerIndex}>
                                                                                <td>{trade.quantity}</td>
                                                                                <td>{trade.price}</td>
                                                                                <td>{trade.stopLoss}</td>
                                                                                <td>{trade.entryDate}</td>
                                                                                <td>{trade.narration}</td>
                                                                            </tr>
                                                                        ))): 
                                                                        (
                                                                        <tr>
                                                                            <td colSpan="3">No trades !!</td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                )) : <tr><td colSpan={4}>No Holdings !!</td></tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Holdings
