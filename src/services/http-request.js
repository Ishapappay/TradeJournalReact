import customToaster from '../helper/custom-toaster';

let baseUrl = 'https://localhost:7228/api/';

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

// export async function CreateTrader(firstName,lastName,phone, email, password,image) {
//     debugger
//     const response = await fetch(" https://localhost:7228/api/user-accounts/trader", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             FirstName:firstName,
//             LastName:lastName,
//             Phone:phone,
//             Email: email,
//             Password: password, 
//             imageFile:image    
//         }),
//     });

//     if (response.status === 200) {
//         customToaster.success('Trader added sucessfully');
//         const data = await response.json();
//     } else {
//         customToaster.success('Something went wrong');
//     }
// }

export async function post(url, data) {
    debugger
    let options = {}

    if (data instanceof FormData) {
        options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },
            body: data
        }
    } else {
        options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    }
    var response = await fetch(baseUrl + url,
        {
            method: 'POST',
            ...options
        });
    return response;
}

export async function put(url, id, data) {
    let options = {}

    if (data instanceof FormData) {
        options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },
            body: data
        }
    } else {
        options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    }
    debugger
    var response = await fetch(baseUrl + url + '/' + id,
        {
            method: 'PUT',
            ...options
        });
    return response;
}

export async function get(url, id) {

    var response = await fetch(baseUrl + url + '/' + id,
        {
            method: 'GET', headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                "Content-Type": "application/json"
            },
        });
    return response;
}


export async function getAll(url) {    
    var response = await fetch(baseUrl + url,
        {
            method: 'GET', headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                "Content-Type": "application/json"
            },
        });
    return response;
}

export async function deleteItem(url, id) {
    var response = await fetch(baseUrl + url + '/' + id,
        {
            method: 'DELETE', headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                "Content-Type": "application/json"
            },
        });
    return response;
}

export async function fetchStockData() {
    const API_KEY = '19ZXMFK0DL81ODW0';

    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    //var data = await response.json();
    //return data;
    return response;
};