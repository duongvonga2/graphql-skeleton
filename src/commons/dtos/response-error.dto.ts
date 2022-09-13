export class ResponseErrorDto<T = any> {
  constructor(params: Partial<ResponseErrorDto>) {
    if(typeof params.message === 'object'){
        params.message = JSON.stringify(params.message);
    }
    Object.assign(this, params);
  }

  statusCode: number = 400;
  name: string = 'SERVER_ERROR';
  message: string = 'failure';
  messageCode: string = '99';
  error!: T;
}
