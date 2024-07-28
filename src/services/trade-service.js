import { deleteItem, get, getAll, post, put } from './http-request';
import customToaster from '../helper/custom-toaster';

export async function createTrade(data) {
    debugger
    var response = await post('Trade', data);
    if (response.status !== 200) {
        customToaster.error('Something wrong in trade creation');
        return
    }
    customToaster.success('Trade added sucessfully');
    return response;
}

export async function getTrade(data) {
    
    var response = await get('Trade', data);
    if (response.status !== 200) {
        customToaster.error('Something went wrong');
        return
    }
    return await response.json();
}

export async function getAllTrade() {
    var response = await getAll('Trade');
    if (response.status !== 200) {
        customToaster.error('Something went wrong ');
        return
    }
    return await response.json();
}

export async function updateTrade(id,data) {
    debugger
    var response = await put('Trade',id, data);
    if (response.status !== 200) {
        customToaster.error('Something wrong in trade updation');
        return
    }
    customToaster.success('Trade updated sucessfully');
    return await response.json();
}

export async function deleteTrade(data) {
    var response = await deleteItem('Trade', data);
    if (response.status !== 200) {
        customToaster.error('Something wrong in trade deletion');
        return
    }
    customToaster.success('Trade deleted sucessfully');
    return await response.json();
}