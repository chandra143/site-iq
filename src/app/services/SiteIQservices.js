import apiConfig from '../../app/services/api-config-service';
import axiosService from '../../app/services/http-service';
import axios from 'axios';
import {environment} from '../../../server';

let key="bryjUflFDj8rWTA23DE2d9cGZVJi8jVf2jdTMiMk";

export function checkTwoWireStatus(Id){
    const url = apiConfig.getServiceUrl('checktwowire').replace(':Id', Id);
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getTwoWireRequest(Id){ 
    const url = apiConfig.getServiceUrl('two_wire').replace(':Id', Id);
    return axiosService.xhr({url, method: 'G', key: key});
};

export function Gettemp(Id,day){
    let params = {
        day:day
    };
    const url = apiConfig.getServiceUrl('url_temphumidity').replace(':Id', Id);
    return axiosService.xhr({url, method: 'G', params:params, key: key});
};

export function getFlowRateA(Id,day){  
    let params = {
        day: day
    };
    const url = apiConfig.getServiceUrl('url_perfaflowrates').replace(":Id",Id);
    return axiosService.xhr({url, method: 'G', params: params, key: key});
};

export function getFlowRateB(Id,day){ 
    let params = {
        day: day
    };
    const url = apiConfig.getServiceUrl('url_perfbflowrates').replace(":Id",Id);
    return axiosService.xhr({url, method: 'G', params: params, key: key});    
};

export function rebootHistory(Id){
    const url = apiConfig.getServiceUrl('urlReboot').replace(":Id",Id);
    return axiosService.xhr({url, method: 'G', key: key});
};

export function forceReboot(Id,target,data){
    let params = {
        target: target.target
    };
    const url = apiConfig.getServiceUrl('urlReboot').replace(":Id",Id);
    return axiosService.xhr({url, method: 'P', data: data, params: params, key: key});
};

export function reboot(Id,target,data){
    let params = {
        target: target.target
    };
    const url = apiConfig.getServiceUrl('urlReboot').replace(":Id",Id);
    return axiosService.xhr({url, method: 'P', data: data, params: params, key: key});
};

export function errorFix(Id){ 
    const url = apiConfig.getServiceUrl('urlRegions').replace(":Id",Id);
    return axiosService.xhr({url, method: 'G', key: key});
};

export function ignore(Id){
    const url = apiConfig.getServiceUrl('urlIgnore').replace(":Id", Id);
    return axiosService.xhr({url, method: 'G', key: key});    
};

export function getRegions(){   
    const url = apiConfig.getServiceUrl('urlRegions');
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getRoles(){  
    const url = apiConfig.getServiceUrl('urlRoles');
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getSitesByClientId(Id){ 
    const url = apiConfig.getServiceUrl('urlGetSiteByClientId').replace(":Id", Id);
    return axiosService.xhr({url, method: 'G', data: data, key: key});
};

export function addClient(data){
    const url = apiConfig.getServiceUrl('urlAddClient');
    return axiosService.xhr({url, method: 'P', data: data, key: key});
};

export function addUser(data){ 
    const url = apiConfig.getServiceUrl('urlAddUser');
    return axiosService.xhr({url, method: 'P', data: data, key: key});
};

export function getClient(Id){  
    const url = apiConfig.getServiceUrl('getClientById').replace(":Id", Id);
    return axiosService.xhr({url, method: 'G', data: data, key: key});
};

export function getUser(Id){ 
    const url = apiConfig.getServiceUrl('getUserById').replace("Id",Id);
    return axiosService.xhr({url, method: 'G', key: key});
};

export function assignAlert(data){
    const url = apiConfig.getServiceUrl('urlAssign');
    return axiosService.xhr({url, method: 'P', data: data, key: key});
};

export function getAlerts(Id){
    const url = apiConfig.getServiceUrl('urlAlerts').replace("Id",Id);
    return axiosService.xhr({url, method: 'G'});
};

export function getSitesByRegionId(Id){  
    const url = apiConfig.getServiceUrl('urlGetSiteByRegion').replace("Id",Id);
    return axiosService.xhr({url, method: 'P', data: data, key: key});
};

export function getRegionSites(Id,Type){
    let params = {
        type: Type
    };
    const url = apiConfig.getServiceUrl('urlRegionSites').replace("Id",Id);
    return axiosService.xhr({url, method: 'G', params: params, key: key});
};

export function getRegionsById(Id,Type){
    let params = {
        type: Type
    };
    const url = apiConfig.getServiceUrl('urlRegionsById').replace("Id",Id);
    return axiosService.xhr({url, method: 'G', params: params, key: key});
};

export function login(data){
    const url = apiConfig.getServiceUrl('urlLogin');
    return axiosService.xhr({url, method: 'P', data: data, key: key});
};

export function getPumpErrorLog() {
    const url = apiConfig.getServiceUrl('urlerrorcode');
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getWorkOrder() {
    const url = apiConfig.getServiceUrl('urlworkorder');
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getTechnician() {
    const url = apiConfig.getServiceUrl('Urltechnician');
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getSites() {
    const url = apiConfig.getServiceUrl('urlsites');
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getActivityFeed() {
    const url = apiConfig.getServiceUrl('activityfeed');
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getMeter() {
    const url = apiConfig.getServiceUrl('ulrmeter');
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getClients() {
    const url = apiConfig.getServiceUrl('urluserclients');
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getRegion(Id) {
    const url = apiConfig.getServiceUrl('urluserregion').replace(':Id', Id);
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getBranch(Id) {
    const url = apiConfig.getServiceUrl('urluserbranch').replace(':Id', Id);
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getUserMangement() {
    const url = apiConfig.getServiceUrl('urlusermagements');
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getUsers() {
    const url = apiConfig.getServiceUrl('getUsers');
    return axiosService.xhr({url, method: 'G', key: key});
};

export function postUser(data) {
    const url = apiConfig.getServiceUrl('adduser');
    return axiosService.xhr({url, method: 'P', data: data, key: key});
};

export function getSiteData(id) {
    const url = apiConfig.getServiceUrl('getSiteData').replace(":Id",id);
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getSiteData1(id,date,days) {
    let params = {
        date: date,
        days: days
    }
    const url = apiConfig.getServiceUrl('getSiteData').replace(":Id",id);
    return axiosService.xhr({url, method: 'G',params: params, key: key});
};

export function getDeviceBySiteId(id) {
    const url = apiConfig.getServiceUrl('getdevices').replace(":Id",id);
    return axiosService.xhr({url, method: 'G', key: key});
};

export function getDispenserDataById(Id,day){
    let params = {
        days:day
    };
    const url = apiConfig.getServiceUrl('url_dispenser').replace(":Id",Id);
    return axiosService.xhr({url, method: 'G', params:params, key: key});
};

