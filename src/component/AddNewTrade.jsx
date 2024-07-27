import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
//import { PortfolioContext } from "./portfolioContext";
import { getAllStrategy } from '../services/strategy-service';
import { createTrade, updateTrade, getTrade } from '../services/trade-service';
import { PortfolioContext } from "./PortfolioProvider";

function AddNewTrade() {
    debugger
    //const { portfolio } = useContext(PortfolioContext);
    let { id } = useParams();
    let { shade } = useParams();
    const [images, setImages] = useState([]);
    const [Action, setAction] = useState("BUY");
    const [selectedStrategy, setSelectedStrategy] = useState('');
    const [strategies, setStrategies] = useState([]);
    const [code, setCode] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [stoploss, setStoploss] = useState("");
    const [entryDate, setEntryDate] = useState("");
    const [description, setDescription] = useState("");
    const [holdingId, setHoldingId] = useState(0);

    useEffect(() => {
        fetchStartegies();

        if (id !== "0") {
            fetchTradeDetails();
        }

        if (shade === "Sell") {
            setAction("sell");
        }
    }, []);

    // useEffect(() => {
    //     console.log("done");
    // }, [strategies]);

    async function fetchTradeDetails() {
        try {
            const trade = await getTrade(id);
            setCode(trade.holding.code);
            setPrice(trade.price);
            setQuantity(trade.quantity);
            setStoploss(trade.stopLoss);
            setEntryDate(trade.entryDate);
            setDescription(trade.description);
            setSelectedStrategy(trade.strategyId)
            // setImages(trade.image)     
            setHoldingId(trade.holding.identifier);
        } catch (error) {
            console.error('Error fetching trade details:', error);
        }
    }

    async function fetchStartegies() {
        try {
            const result = await getAllStrategy();
            setStrategies(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function addImageRow(e) {
        e.preventDefault();
        let image = { imageFile: null, imageTag: 1 }
        let newImages = [...images, image]
        setImages(newImages)
    }

    function changeImageFile(index, value) {
        let updatedImages = [...images];
        updatedImages[index].imageFile = value;
        setImages(updatedImages);
    }

    function changeImageTag(index, value) {
        let updatedImages = [...images]
        updatedImages[index].imageTag = value;
        setImages(updatedImages)
    }

    function handleStartegySelectionChange(e) {
        debugger
        setSelectedStrategy(e.target.value);
    }

    async function submitTrade(e) {
        debugger
        e.preventDefault()
        let newTrade = new FormData();
        newTrade.append('Action', Action);
        newTrade.append('Code', code);
        newTrade.append('Price', price);
        newTrade.append('EntryDate', entryDate);
        newTrade.append('Quantity', quantity);
        newTrade.append('StopLoss', stoploss);
        newTrade.append('StrategyId', selectedStrategy);
        newTrade.append('Description', description);
        //newTrade.append('PortfolioId', portfolio);

        images.forEach((image, index) => {
            newTrade.append(`Images[${index}].ImageFile`, image.imageFile)
            newTrade.append(`Images[${index}].ImageTag`, image.imageTag)
        })

        if (id === "0") {
            await createTrade(newTrade);
        } else {
            newTrade.append('HoldingsId', holdingId)
            await updateTrade(id, newTrade);
        }
    }

    return (
        <div>
            Add New Trade
            <br></br>
            <form onSubmit={submitTrade}>
                <div className="mb-3">
                    <label htmlFor="Code" className="form-label">Trade Code</label>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" className="form-control" id="exampleInputtext" readOnly={id !== "0"} />
                </div>

                <div className="mb-3">
                    <label htmlFor="Price" className="form-label">Price</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" id="exampleInputtext" />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="date">Date</label>
                    <input className="form-control" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} id="date" name="date" placeholder="MM/DD/YYYY" type="date" />
                </div>

                <div className="mb-3">
                    <label htmlFor="Quantity" className="form-label">Quantity</label>
                    <input type="text" value={quantity} className="form-control" onChange={(e) => setQuantity(e.target.value)} id="exampleInputtext" />
                </div>

                <div className="mb-3">
                    <label htmlFor="StopLoss" className="form-label"> Stop Loss</label>
                    <input type="text" value={stoploss} className="form-control" onChange={(e) => setStoploss(e.target.value)} id="exampleInputtext" />
                </div>

                <div className="mb-3">
                    <label htmlFor="StopLoss" className="form-label"> Strategy</label>
                </div>

                <div className="mb-3">
                    <select onChange={handleStartegySelectionChange}>
                        <option value="" >Select a strategy</option>
                        {strategies.map(strategy => (
                            <option key={strategy.id} value={strategy.id} selected={(selectedStrategy !== undefined && selectedStrategy === strategy.id)}>
                                {strategy.name}
                            </option>
                        ))}
                    </select>
                    <Link to="/settings">Add new</Link>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlFile1" className="form-label">Images</label>
                    <button type="button" onClick={addImageRow}>AddImage</button>
                    {
                        images.map((image, index) => {
                            return (
                                <div>
                                    <input type="file" onChange={(e) => changeImageFile(index, e.target.files[0])} className="form-control-file" id={`exampleFormControlFile${index}`} />
                                    <select onChange={(e) => changeImageTag(index, e.target.value)}>
                                        <option value={1}>
                                            Hourly
                                        </option>
                                        <option value={2}>
                                            Daily
                                        </option>
                                        <option value={3}>
                                            Weekly
                                        </option>
                                    </select>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default AddNewTrade