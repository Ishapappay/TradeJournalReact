
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

export async function put(url,id,data){
    var response = await fetch(baseUrl+url+'/'+id,
    {                
        method: 'PUT', headers: {
            'Authorization':`Bearer ${localStorage.getItem('Token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response;
}

export async function get(url,id){
    var response = await fetch(baseUrl+url+'/'+id,
    {                
        method: 'GET', headers: {
            'Authorization':`Bearer ${localStorage.getItem('Token')}`,
            "Content-Type": "application/json"
        },
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
     });
    return response;
}

export async function deleteItem(url,id){
    var response = await fetch(baseUrl+url+'/'+id,
    {                
        method: 'DELETE', headers: {
            'Authorization':`Bearer ${localStorage.getItem('Token')}`,
            "Content-Type": "application/json"
        },
//body: JSON.stringify(data)
    });
    return response;
}