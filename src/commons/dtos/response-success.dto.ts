export class ResponseSuccessDto<T = any> {
    constructor(params: Record<string,any>){
        Object.assign(this, params);
    }

    statusCode: number = 200;
    message: string = "successfully";
    messageCode: string = '00';
    total?: number;
    pageSize?: number;
    page?: number;
    data!: T;
}