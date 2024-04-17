import { useState, useEffect } from "react"
import { createStrategy } from '../services/strategy-service';
import { getAllStrategy } from '../services/strategy-service';

function Strategies() {
     const [StrategyName, setStrategyName] = useState("")
    const [Description, setDescription] = useState("")

    async function submit(e) {
        e.preventDefault()
        let newStrategy = { Name: StrategyName, Description };
        await createStrategy(newStrategy);
        fetchData();
        setStrategyName("");
        setDescription("");
    }

    const [strategies, setStrategies] = useState([]);

    async function fetchData() {
        try {
            const result = await getAllStrategy();
            setStrategies(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } 

    useEffect(() => {
       fetchData();
       
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

                        <button type="submit" className="btn btn-primary">Submit</button>
                   
                    </form>
                </div></div>
            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                 <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                                {strategies.map(strategy => (
                                    <tr key={strategy.id}>
                                         <td>{strategy.name}</td>
                                        <td>{strategy.Description}</td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                </div></div>

        </div>
    )
}
export default Strategies
