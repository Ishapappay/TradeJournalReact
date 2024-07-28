
import customToaster from '../helper/custom-toaster';

export async function getStock(stock) {

    var response = await fetch('https://localhost:7228/api/stock/Code?code='+ stock,
        {
            method: 'GET', headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                "Content-Type": "application/json"
            },
        });
    return response;
}