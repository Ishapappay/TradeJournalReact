import { delet, get, getAll, post, put } from './http-request';
import customToaster from '../helper/custom-toaster';

export async function createTrade(data) {
    var response = await post('Trade', data);
    if (response.status != 200) {
        customToaster.error('Something wrong in trade creation');
        return
    }
    customToaster.success('Trade added sucessfully');
    return response;
}

export async function getTrade(data) {
    var response = await get('Trade', data);
    if (response.status != 200) {
        customToaster.error('Something went wrong');
        return
    }
    return response;
}

export async function getAllTrade() {
    var response = await getAll('Trade');
    if (response.status != 200) {
        customToaster.error('Something went wrong ');
        return
    }
    return response;
}

export async function updateTrade(data) {
    var response = await put('Trade', data);
    if (response.status != 200) {
        customToaster.error('Something wrong in trade updation');
        return
    }
    customToaster.success('Trade updated sucessfully');
    return response;
}

export async function deleteTrade(data) {
    var response = await delet('Trade', data);
    if (response.status != 200) {
        customToaster.error('Something wrong in trade deletion');
        return
    }
    customToaster.success('Trade deleted sucessfully');
    return response;
}