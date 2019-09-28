import {environment} from '../../../server';

const baseUrl = environment.baseUrl;


let apiUrls = {
    // old
    // urlWeightsandMeasures : 'read-aurora-get-weights-and-measures',
    // urlPerformance1Aurora : 'https://97zn0qshi5.execute-api.us-e,ast-2.am/azonaws.com/dev/read-aurora-get-performance1',
    // urlPerformance2Aurora : 'read-aurora-get-performance2',
    // urlpumpversion : 'read-aurora-get-pump-version',
    // new
    urlerrorcode : 'rear-aurora-pumperrorlog',
    urlworkorder : 'workorderlisting',
    urltechnician : 'technician',
    activityfeed : 'activityfeed',
    ulrmeter : 'read-aurora-get-meterinfo',
    urlsites:'get-sites-info',
    // new services Get By ID
    urluserclients : 'usermangement-clients',
    urluserregion : 'usermanagement-region/',
    urluserbranch : 'usermanagement-branch/',
    urlusersite : 'usermanagement-site/',
    urluserroles : 'usermanagement-roles',
    urlusermagements : 'get-users-usermanagement',
    //users
    adduser : 'usermanagement-add-user',
    getUsers : 'get-users-usermanagement',
    //Site Dashboard
    getSiteData : 'sitedispenser/:Id',
    //Dispenser Dashboard
    getdevices : 'dispenserdashboard-site-id/:Id',
    url_dispenser:'dispenser-report-data',

    urlLogin : "login",
    urlRegionsById : "userregions/:Id",
    urlRegionSites:"regionsites",
    urlGetSiteByRegion :"siteregions/:Id",
    urlAlerts : "allalerts/:Id",
    urlAssign : "allalerts",
    urlIgnore : "alertsignore/:Id",
    urlAddUser : "user",
    getUserById : "user/:Id",
    urlAddClient : "clientmanagement",
    getClientById : "clientmanagement/:Id",
    urlGetSiteByClientId : "sitesbyclientid/:Id",
    urlRoles :"roles",
    urlRegions : "regions",
    urlErrorFix : "https://mrs6ea2pq4.execute-api.us-east-2.amazonaws.com/dev/errorcode/:Id",
    urlReboot : "reboot/:Id",
    url_perfaflowrates:"perfaflowrates",
    url_perfbflowrates:"perfbflowrates",
    url_temphumidity:"sensortemphumidity",
    checktwowire : "deviceverify/:Id/checktwowirestatus'",
    two_wire : "deviceverify/:Id/twowirerequest",
}

class ApiConfigService {
    getApiUrl(key) {
        console.log(baseUrl + apiUrls[key]);
        return baseUrl + apiUrls[key];
      }
    
      getServiceUrl(service) {
        return this.getApiUrl(service);
      }
}


export default new ApiConfigService();
