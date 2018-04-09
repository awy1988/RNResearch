import { BASE_URL } from "../constants/ApiConstants";

export default class ApiService {
static login(userName, passWord) {
        console.log('login method in ' + userName);
        console.log('login method in222 ' + passWord);

        return fetch(BASE_URL + '/authorizations', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username:userName,
                password:passWord
            })
        });
        
    }
}