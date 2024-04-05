class TokenService {
  private static ACCESS_TOKEN_KEY = "access_token";
  private static REFRESH_TOKEN_KEY = "refresh_token";

  static setAccessToken(token: string): void {
    localStorage.setItem(TokenService.ACCESS_TOKEN_KEY, token);
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(TokenService.ACCESS_TOKEN_KEY);
  }

  static setRefreshToken(token: string): void {
    localStorage.setItem(TokenService.REFRESH_TOKEN_KEY, token);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(TokenService.REFRESH_TOKEN_KEY);
  }

  static setRefreshTokenTimeout(timeout: string): void {
    localStorage.setItem("refresh_token_timeout", timeout.toString());
  }

  static getRefreshTokenTimeout(): string | null {
    return localStorage.getItem("refresh_token_timeout");
  }

  static removeAccessToken(): void {
    localStorage.removeItem(TokenService.ACCESS_TOKEN_KEY);
  }

    static removeRefreshToken(): void {
        localStorage.removeItem(TokenService.REFRESH_TOKEN_KEY);
    }

    static removeRefreshTokenTimeout(): void {
        localStorage.removeItem("refresh_token_timeout");
    }
}

export default TokenService;
