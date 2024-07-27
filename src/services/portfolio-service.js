import { get, deleteItem, getAll, post, put } from './http-request';
import customToaster from '../helper/custom-toaster';

export async function getAllPortfolio() {
    var response = await getAll('Portfolio');
    if (response.status !== 200) {
        customToaster.error('Something went wrong');
        return
    }
    return await response.json();
}

export async function createPortfolio(data) {
    debugger
    var response = await post('Portfolio', data);
    if (response.status !== 200) {
        customToaster.error('Something wrong in Portfolio creation');
        return
    }
    customToaster.success('Portfolio added sucessfully');
    return response;
}

export async function getPortfolio(data) {
    var response = await get('Portfolio', data);
    if (response.status !== 200) {
        customToaster.error('Something wrong');
        return
    }
    return response;
}

export async function getSelectedPortfolio() {
    debugger
    var response = await fetch('https://localhost:7228/api/Portfolio/selectedPortfolio',
        {
            method: 'GET', headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                "Content-Type": "application/json"
            },
        });
    if (response.status !== 200) {
        customToaster.error('Something wrong');
        return
    }
    var portfolio= await response.json();
    return portfolio;
}

export async function changePortfolio(data) {    
    var response = await fetch('https://localhost:7228/api/Portfolio/changePortfolio'+data,
        {
            method: 'PUT', headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                "Content-Type": "application/json"
            },
        });
    if (response.status !== 200) {
        customToaster.error('Something wrong');
        return
    } else {
        customToaster.success('Portfolio switched');
        return
    }
}

export async function deletePortfolio(data) {
    var response = await deleteItem('Portfolio', data);
    if (response.status !== 200) {
        customToaster.error('Something wrong in Portfolio deletion');
        return
    }
    customToaster.success('Portfolio deleted sucessfully');
    return response;
}

export async function updatePortfolio(id, data) {
    var response = await put('Portfolio', id, data);
    if (response.status !== 200) {
        customToaster.error('Something wrong in Portfolio updation');
        return
    }
    customToaster.success('Portfolio updated sucessfully');
    return response;
}