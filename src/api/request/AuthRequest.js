import BaseRequest from "../BaseRequest";

export default class AuthRequest extends BaseRequest {

  postChangePassword(params) {
    return this.post('auth/change-password', params)
  }

  logout() {
    return this.post('logout');
  }

}
