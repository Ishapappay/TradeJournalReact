import { useState, useEffect } from "react"
import { getAllPortfolio, createPortfolio, deletePortfolio, updatePortfolio } from '../services/portfolio-service';
import { getAllStrategy, createStrategy, deleteStrategy, updateStrategy } from '../services/strategy-service';
import { getSelectedPortfolio, changePortfolio } from '../services/portfolio-service'


export const Settings = () => {

    const [portfolios, setPortfolios] = useState([]);
    const [strategies, setStrategies] = useState([]);

    const [portfolioId, setPortfolioId] = useState("")
    const [strategyId, setstrategyId] = useState("")
    const [showPortfolioForm, setShowPortfolioForm] = useState(false);
    const [showPortfolioChangeForm, setShowPortfolioChangeForm] = useState(false);
    const [showStrategyForm, setShowStrategyForm] = useState(false);
    const [portfolioSave, setPortfolioSave] = useState(true);
    const [strategySave, setStrategySave] = useState(true);
    const [portfolio, setPortfolio] = useState({ name: null, description: null })
    const [strategy, setStrategy] = useState({ name: null, description: null })
    const [selectedPortfolio, setSelectedPortfolio] = useState("")

    useEffect(() => {
        fetchPortfolios();
        fetchStrategies();
        fetchSelectedPortfolio();
    }, []);

    async function fetchPortfolios() {
        try {

            const result = await getAllPortfolio();
            setPortfolios(result);
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
        e.preventDefault()

        if (portfolioSave) {
            await createPortfolio(portfolio);
        } else {
            await updatePortfolio(portfolioId, portfolio);
        }

        fetchPortfolios();
        setPortfolio({ name: "", description: "" })
        setPortfolioSave(true);
        setPortfolioId("");
    }

    async function saveStrategy(e) {
        e.preventDefault()
        if (strategySave) {
            await createStrategy(strategy);
        } else {
            await updateStrategy(strategyId, strategy)
        }

        fetchStrategies();
        setStrategy({ name: "", description: "" })
        setStrategySave(true);
        setstrategyId("");
    }

    const handleDeletePortfolio = async (id) => {
        try {
            
            const isConfirmed = window.confirm('Are you sure you want to delete this item?');
            if (isConfirmed) {
                const result = await deletePortfolio(id);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        fetchPortfolios();
    };

    const handleDeleteStrategy = async (id) => {
        try {
            const isConfirmed = window.confirm('Are you sure you want to delete this item?');
            if (isConfirmed) {
                const result = await deleteStrategy(id);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        fetchStrategies();
    };

    const handleUpdatePortfolio = (portfolio) => {
        
        setShowPortfolioForm(true);
        setPortfolioSave(false)
        setPortfolioId(portfolio.identifier)
        setPortfolio({ ...portfolio, name: portfolio.name, description: portfolio.description })
    };

    const handleUpdateStrategy = (strategy) => {
        setShowStrategyForm(true);
        setStrategySave(false)
        setstrategyId(strategy.id)
        setStrategy({ ...strategy, name: strategy.name, description: strategy.description })
    };
    async function fetchSelectedPortfolio() {
        try {
            
            const result = await getSelectedPortfolio();
             setSelectedPortfolio(result.identifier);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        }
    }
    async function changeSelectedPortfolio() {
        try {
            setShowPortfolioChangeForm(false);
            
            const result = await changePortfolio(selectedPortfolio);
            //  setPortfolio(result);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        }
    }
    function handleStartegySelectionChange(e) {
        setSelectedPortfolio(e.target.value)
    };
    return (
        <div>
            <div>
                <div className="portfolio-header">
                    <h4>Portfolios</h4>
                    <button onClick={() => setShowPortfolioChangeForm(true)} type="button" className="btn btn-primary" disabled={showPortfolioForm ? true : false}>Change Portfolio</button>
                    <button onClick={() => setShowPortfolioForm(true)} type="button" className="btn btn-primary" disabled={showPortfolioForm ? true : false}>Add</button>
                </div>
                <hr></hr>
                <div className="portfolio-table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    Portfolio Name
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>
                                    Edit
                                </th>
                                <th>
                                    Delete
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
                            <label>Portfolio Name</label>
                            <input className="form-control me-2" value={portfolio.name} onChange={(e) => setPortfolio({ ...portfolio, name: e.target.value })} type="search" placeholder="Portfolio" aria-label="Search" />
                        </div>
                        <div>
                            <label>Description</label>
                            <input className="form-control me-2" value={portfolio.description} type="search" onChange={(e) => setPortfolio({ ...portfolio, description: e.target.value })} placeholder="Description" aria-label="Search" />
                        </div>
                        <button className="btn btn-outline-primary" >Save</button>
                    </form>)
                }
                <hr></hr>

                {
                    showPortfolioChangeForm && (
                        <form className="strategy-form" onSubmit={changeSelectedPortfolio}>
                            <select onChange={handleStartegySelectionChange}>
                                {
                                    
                                portfolios.map(  prtflo => (
                                    <option key={prtflo.identifier} value={prtflo.identifier} selected={(selectedPortfolio !== undefined && selectedPortfolio === prtflo.identifier)}>
                                        {prtflo.name}
                                    </option>
                                ))}
                            </select>
                            <button className="btn btn-outline-primary" >Save</button>
                        </form>)}
            </div>
            <hr></hr>

            <div>
                <div className="portfolio-header">
                    <h4>Strategies</h4>
                    <button onClick={() => setShowStrategyForm(true)} type="button" className="btn btn-primary" disabled={showStrategyForm ? true : false}>Add</button>
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
                                    Edit
                                </th>
                                <th>
                                    Delete
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
                                                    <i class="bi bi-pencil" onClick={() => handleUpdateStrategy(strategy)} ></i>
                                                </td>
                                                <td><i class="bi bi-trash" onClick={() => handleDeleteStrategy(strategy.id)}></i></td>
                                            </tr>
                                        )
                                    }) : <tr><td colSpan={4}>No data !!</td></tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <hr></hr>
                {showStrategyForm && (
                    <form className="strategy-form" onSubmit={saveStrategy}>
                        <div>
                            <label>Strategy Name    </label>
                            <input className="form-control me-2" value={strategy.name} onChange={(e) => setStrategy({ ...strategy, name: e.target.value })} type="search" placeholder="Portfolio" aria-label="Search" />
                        </div>
                        <div>
                            <label>Description    </label>
                            <input className="form-control me-2" value={strategy.description} type="search" onChange={(e) => setStrategy({ ...strategy, description: e.target.value })} placeholder="Description" aria-label="Search" />
                        </div>
                        <button className="btn btn-outline-primary" >Save</button>
                    </form>)}
            </div>
        </div>
    )
}