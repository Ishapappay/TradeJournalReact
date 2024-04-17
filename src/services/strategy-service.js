import {get,deleteItem, getAll, post, put } from './http-request';
import customToaster from '../helper/custom-toaster';

export async function createStrategy(data) {
    var response = await post('Strategies', data);
    if (response.status != 200) {
        customToaster.error('Something wrong in strategy creation');
        return
    }
    customToaster.success('Strategy added sucessfully');
    return response;
}

export async function getStrategy(data) {
    var response = await get('Strategies', data);
    if (response.status != 200) {
        customToaster.error('Something wrong');
        return
    }
    return response;    
}

export async function getAllStrategy() {
    var response = await getAll('Strategies');
    if (response.status != 200) {
        customToaster.error('Something went wrong');
        return
    }
    return await response.json();
}

export async function deleteStrategy(data) {
    var response = await deleteItem('Strategies', data);
    if (response.status != 200) {
        customToaster.error('Something wrong in strategy deletion');
        return
    }
    customToaster.success('Strategy deleted sucessfully');
    return response;
}

export async function updateStrategy(data) {
    var response = await put('Strategies', data);
    if (response.status != 200) {
        customToaster.error('Something wrong in strategy updation');
        return
    }
    customToaster.success('Strategy updated sucessfully');
    return response;
}