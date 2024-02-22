import { createHmac } from 'node:crypto';

const secret = 'cupshe_1993010_cupshe';

class Crypto {
  constructor (private secret: string) {}

  /**
   * @description 机密
   * @param password 密码
   * @returns 
   */
  encodePassword (password: string) {
    return createHmac('sha256', this.secret)
      .update(password)
      .digest('hex');
  }

  /**
   * @description 密码是否匹配
   * @param inputPassword 用户输入的密码
   * @param encodePassword 数据库存储的密码
   * @returns 
   */
  isMatch (inputPassword: string, encodePassword) {
    return this.encodePassword(inputPassword) === encodePassword
  }
}

export const crypto = new Crypto(secret);
