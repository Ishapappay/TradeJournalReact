import { useState, useEffect } from "react"
import { getAllPortfolio, createPortfolio, deletePortfolio,updatePortfolio } from '../services/portfolio-service';
import { getAllStrategy, createStrategy, deleteStrategy } from '../services/strategy-service';


export const Settings = () => {

    const [portfolios, setPortfolio] = useState([]);
    const [strategies, setStrategies] = useState([]);

    const [portfolioId, setPortfolioId] = useState("")
    const [strategyId, setstrategyId] = useState("")

    const [showPortfolioForm, setShowPortfolioForm] = useState(false);
    const [showDescriptionForm, setShowDescriptionForm] = useState(false);
   
    const [portfolioSave, setPortfolioSave] = useState(true);
    const [strategySave, setStrategySave] = useState(true);

    const [portfolioName, setPortfolioName] = useState("")
    const [portFolioDescription, setPortfolioDescription] = useState("")
    const [strategyName, setStrategyName] = useState("")
    const [strategydescription, setstategydescription] = useState("")

    useEffect(() => {

        fetchPortfolios();
        fetchStrategies();
    }, []);

    async function fetchPortfolios() {
        try {
            const result = await getAllPortfolio();
            setPortfolio(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    async function fetchStrategies() {
        try {
            const resultStrategies = await getAllStrategy();
            setStrategies(resultStrategies);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    async function savePortfolio(e) {
        debugger
        e.preventDefault()

        if(portfolioSave){
            let newPortfolio = { Name: portfolioName, description: portFolioDescription };
            await createPortfolio(newPortfolio);
        }else{
            let newPortfolio = { Name: portfolioName, description: portFolioDescription };
            await updatePortfolio(portfolioId,newPortfolio);
        }
        
        fetchPortfolios();
        setPortfolioDescription("");
        setPortfolioName("");
        setPortfolioSave(true);
        setPortfolioId("");
    }
    async function saveStrategy(e) {
        e.preventDefault()
        let newDescription = { Name: strategyName, description: strategydescription };
        await createStrategy(newDescription);
        fetchStrategies();
        setstategydescription("");
        setStrategyName("");
    }

    const handleDeletePortfolio = async (index) => {
        debugger

        try {
            const isConfirmed = window.confirm('Are you sure you want to delete this item?');
            if (isConfirmed) {
                const result = await deletePortfolio(index);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        fetchPortfolios();
    };

    const handleUpdatePortfolio = (portfolio) => {
        debugger
        setShowPortfolioForm(true);
        setPortfolioSave(false)
        setPortfolioId(portfolio.id)
        setPortfolioName(portfolio.name)
        setPortfolioDescription(portfolio.description)
     };

    return (
        <div>
            <div>
                <div className="portfolio-header">
                    <h4>Portfolios</h4>
                    <button onClick={() => setShowPortfolioForm(true)} type="button" className="btn btn-primary" disabled={showPortfolioForm ? true : false}>Add</button>
                </div>
                <hr></hr>
                <div className="portfolio-table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>
                                    Delete
                                </th>
                                <th>
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ((portfolios != null && portfolios.length > 0) ?
                                    portfolios.map((portfolio, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{portfolio.name}</td>
                                                <td>{portfolio.description}</td>
                                                <td>
                                                    <i class="bi bi-pencil" onClick={() => handleUpdatePortfolio(portfolio)}></i>
                                                </td>
                                                <td>
                                                    <i class="bi bi-trash" onClick={() => handleDeletePortfolio(portfolio.id)}></i>
                                                </td>
                                            </tr>
                                        )
                                    }) : <tr><td colSpan={4}>No data !!</td></tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <hr></hr>
                {showPortfolioForm && (
                    <form className="strategy-form" onSubmit={savePortfolio}>
                        <div>
                            <label>Portfolio Name    </label>
                            <input className="form-control me-2" value={portfolioName} onChange={(e) => setPortfolioName(e.target.value)} type="search" placeholder="Portfolio" aria-label="Search" />
                        </div>
                        <div>
                            <label>Description    </label>
                            <input className="form-control me-2" value={portFolioDescription} type="search" onChange={(e) => setPortfolioDescription(e.target.value)} placeholder="Description" aria-label="Search" />
                        </div>
                        <button className="btn btn-outline-primary" >Save</button>
                    </form>)}
            </div>

            <div>
                <div className="portfolio-header">
                    <h4>Strategies</h4>
                    <button onClick={() => setShowDescriptionForm(true)} type="button" className="btn btn-primary" disabled={showDescriptionForm ? true : false}>Add</button>
                </div>
                <hr></hr>
                <div className="portfolio-table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    Startegy Name
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>
                                    Delete
                                </th>
                                <th>
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ((strategies != null && strategies.length > 0) ?
                                    strategies.map((strategy, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{strategy.name}</td>
                                                <td>{strategy.description}</td>
                                                <td>
                                                    <i class="bi bi-pencil"></i>
                                                </td>
                                                <td><i class="bi bi-trash"></i></td>
                                            </tr>
                                        )
                                    }) : <tr><td colSpan={4}>No data !!</td></tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <hr></hr>
                {showDescriptionForm && (
                    <form className="strategy-form" onSubmit={saveStrategy}>
                        <div>
                            <label>Strategy Name    </label>
                            <input className="form-control me-2" value={strategyName} onChange={(e) => setStrategyName(e.target.value)} type="search" placeholder="Portfolio" aria-label="Search" />
                        </div>
                        <div>
                            <label>Description    </label>
                            <input className="form-control me-2" value={strategydescription} type="search" onChange={(e) => setstategydescription(e.target.value)} placeholder="Description" aria-label="Search" />
                        </div>
                        <button className="btn btn-outline-primary" >Save</button>
                    </form>)}
            </div>
        </div>
    )
}