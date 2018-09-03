export interface HappeningProps {
  history?: any;
}

class AuthService {
  constructor() {}

  setSesion(authResult) {
    localStorage.removeItem("auth-token");
    localStorage.setItem("auth-token", authResult.token);
  }
}

export default new AuthService();
