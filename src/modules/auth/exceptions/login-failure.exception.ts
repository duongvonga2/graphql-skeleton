export class LoginFailureException extends Error {
    constructor(message?: string){
        super();
        this.name = 'LOGIN_FAILURE',
        this.message = message || 'Wrong user name or password';
    }
}