import apiConfig from '../../app/services/api-config-service';
import axiosService from '../../app/services/http-service';
import axios from 'axios';
import {environment} from '../../../server';

let key="bryjUflFDj8rWTA23DE2d9cGZVJi8jVf2jdTMiMk";
const baseUrl = environment.baseUrl;
let urlerrorcode = baseUrl+'rear-aurora-pumperrorlog';
let urlworkorder = baseUrl+'workorderlisting';
let Urltechnician = baseUrl+'technician';
let activityfeed = baseUrl+'activityfeed';
let ulrmeter = baseUrl+'read-aurora-get-meterinfo';
let Urlsites=baseUrl+'get-sites-info';
// new services Get By ID
let urluserclients = baseUrl+'usermangement-clients';
let urluserregion = baseUrl+'usermanagement-region/';
let urluserbranch = baseUrl+'usermanagement-branch/';
let urlusersite = baseUrl+'usermanagement-site/';
let urluserroles = baseUrl+'usermanagement-roles';
let urlusermagements = baseUrl+'get-users-usermanagement';
//users
let adduser = baseUrl+'usermanagement-add-user'
let getUsers = baseUrl+'get-users-usermanagement'
//Site Dashboard
let getSiteData = baseUrl+'sitedispenser'
//Dispenser Dashboard
let getdevices = baseUrl+'dispenserdashboard-site-id'
let url_dispenser=baseUrl+'dispenser-report-data'

let urlLogin = baseUrl+"login"
let urlRegionsById = baseUrl+"userregions"
let urlRegionSites=baseUrl+"regionsites"
let urlGetSiteByRegion =baseUrl+"siteregions"
let urlAlerts = baseUrl+"allalerts"
let urlAssign = baseUrl+"allalerts"
let urlIgnore = baseUrl+"alertsignore"
let urlAddUser = baseUrl+"user"
let urlAddClient = baseUrl+"clientmanagement"
let urlGetSiteByClientId = baseUrl+"sitesbyclientid"
let urlRoles =baseUrl+"roles"
let urlRegions = baseUrl+"regions"
let urlErrorFix = "https://mrs6ea2pq4.execute-api.us-east-2.amazonaws.com/dev/errorcode"
let urlReboot = baseUrl+"reboot"
let url_perfaflowrates=baseUrl+"perfaflowrates"
let url_perfbflowrates=baseUrl+"perfbflowrates"
let url_temphumidity=baseUrl+"sensortemphumidity"
let two_wire = baseUrl+"deviceverify"
let checktwowire = baseUrl+"deviceverify"




export function checkTwoWireStatus(Id){
    // debugger  
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // debugger
    const url = apiConfig.getServiceUrl('checktwowire').replace(':Id', Id);
    return axiosService.xhr({url, method: 'G', key:key});
    // return axios.get(checktwowire + '/' + Id +'/checktwowirestatus') 
    // .then((res) => res)
    // .catch((error) => error.response);
}
export function getTwoWireRequest(Id){    
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.get(two_wire + '/' + Id+'/twowirerequest' , {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('two_wire').replace(':Id', Id);
    return axiosService.xhr({url, method: 'G'});
}
export function Gettemp(Id,day){
    
    let headers={
        'Content-Type': 'application/json',
        'x-api-key': key
    }
    return axios.get(url_temphumidity + '/' + Id+'?day=' +day , {headers:headers}) 
    .then((res) => res)
    .catch((error) => error.response);
}
export function getFlowRateA(Id,day){    
    let headers={
        'Content-Type': 'application/json',
        'x-api-key': key
    }
    return axios.get(url_perfaflowrates + '/' + Id+ '?day=' +day , {headers:headers}) 
    .then((res) => res)
    .catch((error) => error.response);

    // const url = apiConfig.getServiceUrl('url_perfaflowrates').replace(":Id",Id);
    // return axiosService.xhr({url, method: 'G'});
}
export function getFlowRateB(Id,day){    
    let headers={
        'Content-Type': 'application/json',
        'x-api-key': key
    }
    return axios.get(url_perfbflowrates + '/' + Id+ '?day=' +day , {headers:headers}) 
    .then((res) => res)
    .catch((error) => error.response);
}
export function rebootHistory(Id){  
    // debugger  
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    
    // return axios.get(urlReboot + '/' + Id, {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlReboot').replace(":Id",Id);
    return axiosService.xhr({url, method: 'G'});
}
export function forceReboot(Id,target,data){   
    // debugger 
    let headers={
        'Content-Type': 'application/json',
        'x-api-key': key
    }
    return axios.post(urlReboot + '/' + Id.Id + '?target=' + target.target ,data, {headers:headers}) 
    .then((res) => res)
    .catch((error) => error.response);
}
export function reboot(Id,target,data){    
    // debugger
    let headers={
        'Content-Type': 'application/json',
        'x-api-key': key
    }
    return axios.post(urlReboot + '/' + Id.Id + '?target=' + target.target ,data, {headers:headers}) 
    .then((res) => res)
    .catch((error) => error.response);
}
export function errorFix(Id){    
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    
    // return axios.get(urlErrorFix + '/' + Id, {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlRegions').replace(":Id",Id);
    return axiosService.xhr({url, method: 'G'});
}
export function ignore(Id){    
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.get(urlIgnore + '/' + Id, {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlIgnore').replace(":Id", Id);
    return axiosService.xhr({url, method: 'G'});
    
}
export function getRegions(){    
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.get(urlRegions, {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlRegions');
    return axiosService.xhr({url, method: 'G'});
}
export function getRoles(){    
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.get(urlRoles, {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlRoles');
    return axiosService.xhr({url, method: 'G'});
}
export function getSitesByClientId(Id){    
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.get(urlGetSiteByClientId + '/' + Id, {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlGetSiteByClientId').replace(":Id", Id);
    return axiosService.xhr({url, method: 'G', data: data});
}
export function addClient(data){    
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.post(urlAddClient ,data, {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlAddClient');
    return axiosService.xhr({url, method: 'P', data: data});
}
export function addUser(data){    
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.post(urlAddUser ,data, {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlAddUser');
    return axiosService.xhr({url, method: 'P', data: data});

}

export function getClient(Id){    
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.get(urlAddClient + '/' + Id , {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('getClientById').replace(":Id", Id);
    return axiosService.xhr({url, method: 'G', data: data});
}
export function getUser(Id){    
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.get(urlAddUser + '/' + Id , {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('getUserById').replace("Id",Id);
    return axiosService.xhr({url, method: 'G'});
}
export function assignAlert(data){
    // debugger
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.post(urlAssign ,data, {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlAssign');
    return axiosService.xhr({url, method: 'P', data: data});
}
export function getAlerts(Id){    
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.get(urlAlerts + '/' + Id, {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlAlerts').replace("Id",Id);
    return axiosService.xhr({url, method: 'G'});
}

export function getSitesByRegionId(Id){    
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.get(urlGetSiteByRegion + '/' + Id, {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlGetSiteByRegion').replace("Id",Id);
    return axiosService.xhr({url, method: 'P', data: data});
}
export function getRegionSites(Id,Type){
    // debugger
    let headers={
        'Content-Type': 'application/json',
        'x-api-key': key
    }
    return axios.get(urlRegionSites + '/' + Id + '?type=' + Type, {headers:headers}) 
    .then((res) => res)
    .catch((error) => error.response);

    // const url = apiConfig.getServiceUrl('urlRegionsById').replace("Id",id);
    // return axiosService.xhr({url, method: 'P', data: data});
}
export function getRegionsById(Id,Type){
    //  debugger
    let headers={
        'Content-Type': 'application/json',
        'x-api-key': key
    }
    // debugger
    return axios.get(urlRegionsById + '/' + Id + '?type=' + Type, {headers:headers}) 
    .then((res) => res)
    .catch((error) => error.response);
// debugger

    // const url = apiConfig.getServiceUrl('urlRegionsById').replace("Id",Id);
    // return axiosService.xhr({url, method: 'P', data: data});

}
export function login(data){
    // debugger
    // let headers={
    //     'Content-Type': 'application/json',
    //     'x-api-key': key
    // }
    // return axios.post(urlLogin ,data, {headers:headers}) 
    // .then((res) => res)
    // .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlLogin');
    return axiosService.xhr({url, method: 'P', data: data});
}


// export function GetWeightsandMeasures() {
//     let headers = new Headers({ 'Content-Type': 'application/json' });
//     let options = headers
//     return axios.get(urlWeightsandMeasures, options)
//         .then((res) => res)
//         .catch((error) => error.response);
// }

// export function Getpumpversion() {
//     let headers = new Headers({ 'Content-Type': 'application/json' });
//     let options = headers // Create a request option
//     return axios.get(Urlpumpversion, options)
//         .then((res) => res)
//         .catch((error) => error.response);
// }

// export function GetPerformance1Aurora() {
//     let headers = new Headers({ 'Content-Type': 'application/json' });
//     let options = headers
//     return axios.get(urlPerformance1Aurora, options)
//         .then((res) => res)
//         .catch((error) => error.response);
// }

// export function GetPerformance2Aurora() {
//     let headers = new Headers({ 'Content-Type': 'application/json' });
//     let options = headers
//     return axios.get(urlPerformance2Aurora, options)
//         .then((res) => res)
//         .catch((error) => error.response);
// }


export function getPumpErrorLog() {
    // debugger
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = headers // Create a request option
    // return axios.get(urlerrorcode, options)
    //     .then((response) => response)
    //     .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlerrorcode');
    return axiosService.xhr({url, method: 'G'});
}

export function getWorkOrder() {
    // debugger
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = headers // Create a request option
    // return axios.get(urlworkorder, options)
    //     .then((res) => res)
    //     .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlworkorder');
    return axiosService.xhr({url, method: 'G'});
}

export function getTechnician() {
    // debugger
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = headers // Create a request option
    // return axios.get(Urltechnician, options)
    //     .then((res) => res)
    //     .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('Urltechnician');
    return axiosService.xhr({url, method: 'G'});
}

export function getSites() {
    //  debugger
//     let headers = { 
//         'Content-Type': 'application/json',
//         'x-api-key': key
// };
// ... Set content type to JSON
    // let options = headers // Create a request option
    // return axios.get(Urlsites, { headers: headers })
    //     .then((res) => res)
    //     .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urlsites');
    return axiosService.xhr({url, method: 'G'});
}

export function getActivityFeed() {
    // debugger
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = headers // Create a request option
    // return axios.get(activityfeed, options)
    //     .then((res) => res)
    //     .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('activityfeed');
    return axiosService.xhr({url, method: 'G'});
}

export function getMeter() {
    // debugger
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = headers // Create a request option
    // return axios.get(ulrmeter, options)
    //     .then((res) => res)
    //     .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('ulrmeter');
    return axiosService.xhr({url, method: 'G'});
}

// export function getRoles() {
//     let headers = new Headers({ 'Content-Type': 'application/json' });
//     let options = headers
//     return axios.get(urluserroles, options)
//         .then((res) => res)
//         .catch((error) => error.response);
// }

export function getClients() {
    // debugger
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = headers // Create a request option
    // return axios.get(urluserclients, options)
    //     .then((res) => res)
    //     .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urluserclients');
    return axiosService.xhr({url, method: 'G'});
}

export function getRegion(Id) {
    // debugger
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = headers // Create a request option
    // return axios.get(urluserregion + Id, options)
    //     .then((res) => res)
    //     .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urluserregion');
    return axiosService.xhr({url, method: 'G'});
}

export function getBranch(Id) {
    // debugger
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = headers // Create a request option
    // return axios.get(urluserbranch + Id, options)
    //     .then((res) => res)
    //     .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('urluserbranch');
    return axiosService.xhr({url, method: 'G'});
}

// export function getSites(Id) {
//     let headers = new Headers({ 'Content-Type': 'application/json' });
//     let options = headers
//     return axios.get(urlusersite + Id, options)
//         .then((res) => res)
//         .catch((error) => error.response);
// }

export function getUserMangement() {
    // debugger
//     let headers = { 
//         'Content-Type': 'application/json',
//         'x-api-key': key
// }; // ... Set content type to JSON
//     // let options = headers // Create a request option
//     return axios.get(urlusermagements, {headers:headers})
//         .then((res) => res)
//         .catch((error) => error.response);

const url = apiConfig.getServiceUrl('urlusermagements');
return axiosService.xhr({url, method: 'G'});

}
export function getUsers() {
    // debugger
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = headers // Create a request option
    // return axios.get(getUsers, options)
    //     .then((res) => res)
    //     .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('getUsers');
    return axiosService.xhr({url, method: 'G'});
}


export function postUser(data) {
    //  debugger
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // return axios.post(adduser, data)
    //     .then((res) => res)
    //     .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('adduser');
    return axiosService.xhr({url, method: 'P', data: data});
}

export function getSiteData(id) {
    //  debugger
//      let headers = { 
//         'Content-Type': 'application/json',
//         'x-api-key': key
// }; // ... Set content type to JSON
//     // let options = headers // Create a request option
//     return axios.get(getSiteData+'/'+id , {headers:headers})
//         .then((res) => res)
//         .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('getSiteData').replace(":Id",id);
    return axiosService.xhr({url, method: 'G'});
}
export function getSiteData1(id,date,days) {
    //  debugger
     let headers = { 
        'Content-Type': 'application/json',
        'x-api-key': key
}; // ... Set content type to JSON
    // let options = headers // Create a request option
    return axios.get(getSiteData+'/'+id +'?date=' + date +'&days=' + days, {headers:headers})
        .then((res) => res)
        .catch((error) => error.response);
}
export function getDeviceBySiteId(id) {
    // debugger
//     let headers = { 
//         'Content-Type': 'application/json',
//         'x-api-key': key
// }; // ... Set content type to JSON
//     // let options = headers // Create a request option
//     return axios.get(getdevices+'/'+id, {headers:headers})
//         .then((res) => res)
//         .catch((error) => error.response);

    const url = apiConfig.getServiceUrl('getdevices').replace(":Id",id);
    return axiosService.xhr({url, method: 'G'});

}

export function getDispenserDataById(Id,day){
// debugger;
let headers = { 
    'Content-Type': 'application/json',
    'x-api-key': key
};
// let options = headers
// debugger
return axios.get(url_dispenser + '/' + Id + '?days=' + day, {headers:headers})
.then((res) => res)
.catch((error) => error.response);
}

