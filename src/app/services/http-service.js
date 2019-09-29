import axios from 'axios';

// const key = "bryjUflFDj8rWTA23DE2d9cGZVJi8jVf2jdTMiMk";
class AxiosService {
xhr(request= {
    url,
    method,
    data,
    headers,
    params,
    key,
    without_auth_headers
  }) {
    let headers = {};
    let params = {};
    if(request.key){
      headers = new Headers({'Content-Type': 'application/json', 'x-api-key': request.key});
    }else{
      headers = new Headers({'Content-Type': 'application/json'});
    }
    if(request.params){
      params = request.params;
    };
    
    let service;
    const options = {headers, params};
    if (request.method === 'P') {
      service = axios.post(request.url, request.data, {...options});
    }
    if (request.method === 'PU') {
      service = axios.put(request.url, request.data, {...options} );
    }
    if (request.method === 'G') {
      service = axios.get(request.url,{...options});
    }
    if (request.method === 'D') {
      service = axios.delete(request.url, {body: request.data, ...options});
    }
    return service.then(res => {
        return res;
    }).catch((error) => {
        error.response
    });
  }
}

export default new AxiosService;