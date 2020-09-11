import Utils from "../utils/utils";
import {appHelper} from "../utils/appHelper"

export default class BaseRequest {
  getUrlPrefix() {
    return process.env.VUE_APP_BASE_URL + 'api/';
  }

  post(url, data = {}, headers = null) {
    return new Promise((resolve, reject) => {
      let options = {}
      if (headers) {
        options.headers = headers
      }

      window.axios
        .post(this.getUrlPrefix() + url, data, options)
        .then((response) => {
          if (response.data.message) {
            window.$store.dispatch('app/showModal', {message: response.data.message})
          }
          if (response.data.status === 200) {
            resolve(response.data);
            return;
          }
          if (response.status === 200) {
            resolve(response)
            return
          }
          if (response.data.status === 406) {
            // window.location.href = "/login";
            return;
          }
        })
        .catch((error) => {
          this._errorHandler(reject, error);
        });
    });
  }

  get(url, params) {
    return new Promise((resolve, reject) => {
      window.axios
        .get(this.getUrlPrefix() + url, {params})
        .then((response) => {
          if (response.data.status === 200) {
            resolve(response.data);
            return;
          }
          if (response.status === 200) {
            resolve(response)
            return
          }

          // if(response.data.status === 406){
          //     window.location.href = "/login";
          //     return;
          // }
        })
        .catch((error) => {
          this._errorHandler(reject, error);
        });
    })
  }

  _errorHandler(reject, err) {
    if (err.response) {
      if (err.response.data.status === 414) {
        let first_key = Object.keys(err.response.data.message)[0]
        if (first_key) {
          alert(err.response.data.message[first_key][0])
        }
      }
      if (err.response.data.status === 404) {
        alert(err.response.data.message)
      }
      if (err.response.status === 401) {
        if (appHelper.isClinic()) {
          Utils.removeLocalClinic()
        }
        if (appHelper.isAdmin()) {
          Utils.removeLocalAdmin()
        }
        if (appHelper.isClient()) {
          Utils.removeLocalUser()
        }

        return window.location.href = '/'
      }
    }
    return reject(err);
  }

}
