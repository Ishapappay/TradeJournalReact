import { get, getAll } from './http-request';
import customToaster from '../helper/custom-toaster';


export async function getHolding(data) {
    var response = await get('Holding', data);
    if (response.status !== 200) {
        customToaster.error('Something went wrong');
        return
    }
    return await response.json();
}
export async function getAllHoldings() {       
    var response = await getAll('Holding');    
    if (response.status !== 200) {
        customToaster.error('Something went wrong ');
        return
    }
    return await response.json();
}
