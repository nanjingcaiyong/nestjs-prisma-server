export enum ResultStatus {
  Success = '000000',
  Fail = '000001',
  NoLogin = '002',
  Expired = '003',
  Empty = '004',
  Repeat = '005',
  NoExist = '404',
  ServerError = '500',
}

export const ResultMessage = {
  '000000': 'success',
  '000001': 'error',
  '002': '未登录！',
  '003': '未登录/登录已过期，请先登录！',
  '004': '字段不能为空！',
  '005': '重复创建！',
  '404': '页面不存在！',
  '500': '服务器异常！',
};

export interface Result {
  success: boolean;
  retCode: ResultStatus;
  timeStamp: number;
  data?: any;
  retInfo?: string;
}
