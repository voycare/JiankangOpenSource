import UserRequest from "./request/UserRequest";
import utils from "../utils/utils";
import CommonRequest from "./request/CommonRequest";
import AdminRequest from './request/AdminRequest'
import ClinicRequest from './request/ClinicRequest'
import {appHelper} from "./../utils/appHelper";

const requestMap = {
  AdminRequest,
  UserRequest,
  CommonRequest,
  ClinicRequest
}
const instances = {};


export default class RequestFactory {

  static getRequest(classname) {
    if (utils.getLocalUser() && appHelper.isClient()) {
      window.axios.defaults.headers.common['Authorization'] = utils.getLocalUser().token;
    }
    if (utils.getLocalAdmin() && appHelper.isAdmin()) {
      window.axios.defaults.headers.common['Authorization'] = utils.getLocalAdmin().token;
    }
    if (utils.getLocalClinic() && appHelper.isClinic()) {
      window.axios.defaults.headers.common['Authorization'] = utils.getLocalClinic().token;
    }

    window.axios.defaults.headers.common['Content-Type'] = 'application/json';
    let RequestClass = requestMap[classname];
    if (!RequestClass) {
      throw new Error('Invalid request class name: ' + classname);
    }

    let requestInstance = instances[classname];
    if (!requestInstance) {
      requestInstance = new RequestClass();
      instances[classname] = requestInstance;
    }
    return requestInstance;
  }

}
