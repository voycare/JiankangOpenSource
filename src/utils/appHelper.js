export class appHelper {
  /**
   * @returns {boolean}
   */
  static isClinic() {
    return process.env.VUE_APP_ENV == 'clinic'
  }

  /**
   * @returns {boolean}
   */
  static isClient() {
    return process.env.VUE_APP_ENV == 'client'
  }

  /**
   * @returns {boolean}
   */
  static isAdmin() {
    return process.env.VUE_APP_ENV == 'admin'
  }
}
