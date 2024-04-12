import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllStrategy } from '../services/strategy-service';

function AddNewTrade() {

    const [selects, setSelects] = useState('');
    const [strategies, setStrategies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {                
                const result = await getAllStrategy();
                setStrategies(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } fetchData();
    }, []);
   
    function handleChange(e) {
        debugger
        setSelects(e.target.value);
    }
    return (
        <div>
            Add New Trade

            <br></br>
            <form>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Trade Name</label>
                    <input type="text" className="form-control" id="exampleInputtext" />
                </div>

                <div className="mb-3">
                    <label htmlFor="Price" className="form-label">  Price</label>
                    <input type="text" className="form-control" id="exampleInputtext" />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="date">Date</label>
                    <input className="form-control" id="date" name="date" placeholder="MM/DD/YYYY" type="text" />
                </div>

                <div className="mb-3">
                    <label htmlFor="Quantity" className="form-label">  Quantity</label>
                    <input type="text" className="form-control" id="exampleInputtext" />
                </div>

                <div className="mb-3">
                    <label htmlFor="StopLoss" className="form-label"> Stop Loss</label>
                    <input type="text" className="form-control" id="exampleInputtext" />
                </div>

                <div className="mb-3">
                    <label htmlFor="StopLoss" className="form-label"> Strategy</label>
                    <input type="text" className="form-control" id="exampleInputtext" />
                    <Link to="/Strategies">add</Link>
                </div>

                <div>                
                    <select value={setStrategies} onChange={handleChange}>
                        <option value="">Select a strategy</option>
                        {strategies.map(strategy => (
                            <option key={strategy.id} value={strategy.id}>
                                {strategy.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default AddNewTrade