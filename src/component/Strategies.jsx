import { useState,useEffect } from "react"
import { createStrategy } from '../services/strategy-service';
import strategy from "../css/Strategy.css"
import { getAllStrategy } from '../services/strategy-service';

function Strategies() {
    debugger
    const [StrategyName, setStrategyName] = useState("")
    const [Description, setDescription] = useState("")

    async function submit(e) {
        e.preventDefault()
        let newStrategy = { Name: StrategyName, Description };
        await createStrategy(newStrategy);
    }

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

    return (
        <div className="container">
            <div className="col">
                <div className="row">                 
                    
                    <form onSubmit={submit}>
                        <div className="test">
                            <label htmlFor="Name" className="form-label"  >Strategy Name</label>
                            <input type="text" onChange={(e) => setStrategyName(e.target.value)} className="form-control" id="exampleInputtext" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label"> Description</label>
                            <textarea onChange={(e) => setDescription(e.target.value)}
                                className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Subbmit</button>
                    </form>
                     </div></div>
            <div className="row">
                <div className="col">
                <table>
                        <thead>
                            <tr>
                                <th>Column 1</th>
                                <th>Column 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data 1</td>
                                <td>Data 2</td>
                            </tr>
                        </tbody>
                    </table>
                </div></div>

        </div>
    )
}
export default Strategies
