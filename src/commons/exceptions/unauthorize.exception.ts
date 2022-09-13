export class UnauthorizedException extends Error {
  statusCode: number;
  messageCode: string;
  constructor(message?: string) {
    super();
    this.message = message || 'UNAUTHORIZED';
    this.statusCode = 401;
    this.messageCode = '401';
  }
}
