import {get,deleteItem, getAll, post, put } from './http-request';
import customToaster from '../helper/custom-toaster';

export async function getAllPortfolio() {
    var response = await getAll('Portfolio');
    if (response.status != 200) {
        customToaster.error('Something went wrong');
        return
    }
    return await response.json();
}

export async function createPortfolio(data) {
    var response = await post('Portfolio', data);
    if (response.status != 200) {
        customToaster.error('Something wrong in Portfolio creation');
        return
    }
    customToaster.success('Portfolio added sucessfully');
    return response;
}

export async function getPortfolio(data) {
    var response = await get('Portfolio', data);
    if (response.status != 200) {
        customToaster.error('Something wrong');
        return
    }
    return response;    
}

export async function deletePortfolio(data) {
    debugger
    var response = await deleteItem('Portfolio', data);
    if (response.status != 200) {
        customToaster.error('Something wrong in Portfolio deletion');
        return
    }
    customToaster.success('Portfolio deleted sucessfully');
    return response;
}

export async function updatePortfolio(id,data) {
    debugger
    var response = await put('Portfolio',id, data);
    if (response.status != 200) {
        customToaster.error('Something wrong in Portfolio updation');
        return
    }
    customToaster.success('Portfolio updated sucessfully');
    return response;
}