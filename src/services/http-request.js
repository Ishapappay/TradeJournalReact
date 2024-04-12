
let baseUrl = 'https://localhost:7228/api/';

export async function post(url,data){
    var response = await fetch(baseUrl+url,
    {                
        method: 'POST', headers: {
            'Authorization':`Bearer ${localStorage.getItem('Token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response;
}

export async function put(url,data){
    var response = await fetch(baseUrl+url,
    {                
        method: 'PUT', headers: {
            'Authorization':`Bearer ${localStorage.getItem('Token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response;
}

export async function get(url,data){
    var response = await fetch(baseUrl+url,
    {                
        method: 'GET', headers: {
            'Authorization':`Bearer ${localStorage.getItem('Token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response;
}

export async function getAll(url){
    var response = await fetch(baseUrl+url,
    {                
        method: 'GET', headers: {
            'Authorization':`Bearer ${localStorage.getItem('Token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify()
    });
    return response;
}

export async function delet(url,data){
    var response = await fetch(baseUrl+url,
    {                
        method: 'DELETE', headers: {
            'Authorization':`Bearer ${localStorage.getItem('Token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response;
}