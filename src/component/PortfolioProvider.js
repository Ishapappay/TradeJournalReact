import React, { createContext, useEffect, useState } from 'react';
import { getSelectedPortfolio } from '../services/portfolio-service'

export const PortfolioContext = createContext();

const PortfolioProvider = ({ children }) => {
    const [portfolio, setPortfolio] = useState('');
debugger
    useEffect(() => {
        fetchPortfolio();
    }, []);

    async function fetchPortfolio() {        
        try {
            debugger
            const result = await getSelectedPortfolio();
            setTimeout(() => {
                setPortfolio(result);
            }, 10000);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        }
    }
    return (
        <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export default PortfolioProvider;




