export enum ResultStatus {
  Success = '000000',
  Fail = '000001',
  Empty = '000002',
  Repeat = '000003',
  NoExist = '000004',
  ServerError = '500',
}

export const ResultMessage = {
  '000000': 'success',
  '000001': 'error',
  '000002': 'empty',
  '000003': 'repeat',
  '000004': 'no exist',
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
