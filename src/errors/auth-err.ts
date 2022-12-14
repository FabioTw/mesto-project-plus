import { AUTH_ERROR } from './errors_status';

class AuthError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = AUTH_ERROR;
  }
}

export default AuthError;
