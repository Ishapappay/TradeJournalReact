import { deleteItem, get, getAll, post, put } from './http-request';
import customToaster from '../helper/custom-toaster';

export async function CreateTrader(data) {
    var response = await post('user-accounts/trader', data);
    if (response.status !== 200) {
        customToaster.error('Something wrong in trade creation');
        return
    }
    customToaster.success('User added sucessfully');
    return response;
}

export async function fetchToken(email, password) {
    let item = { UserName: email, password };
    var response = await fetch("https://localhost:7228/api/user-accounts/login",
        {
            method: 'POST', headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

    if (response.status === 200) {
        let result = await response.json()
        return result;
    } else {
        alert("invalid user name or password");
    }
}

export async function ForgotPasswordLink(data) {
    debugger
    var response = await post('user-accounts/forgot-password', data);
    if (response.status !== 200) {
        customToaster.error('Something wrong');
        return
    }
    //customToaster.success('User added sucessfully');
    return response;
}

export async function ResetPassword(data) {
    debugger
    var response = await post('user-accounts/reset-password', data);
    if (response.status !== 200) {
        customToaster.error('Something wrong');
        return
    }
    //customToaster.success('User added sucessfully');
    return response;
}