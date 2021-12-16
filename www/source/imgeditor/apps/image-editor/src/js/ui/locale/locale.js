/**
 * Translate messages
 */
class Locale {
  constructor(locale) {
    locale.Load = '打开';
    locale.Download = '下载';
    locale.SaveImg = '保存';
    this._locale = locale;
  }

  /**
   * localize message
   * @param {string} message - message who will be localized
   * @returns {string}
   */
  localize(message) {
    return this._locale[message] || message;
  }
}

export default Locale;
