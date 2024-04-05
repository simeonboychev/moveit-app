import React, { useState } from "react";
import TokenService from "../../services/token-service";
import {
  API_URL,
  GRANT_TYPE,
  PASSWORD,
  REFRESH_TOKEN,
  USERNAME,
} from "../../constants/constants";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [refreshToken, setRefreshToken] = useState(
    TokenService.getRefreshTokenTimeout()
  );

  interface AuthenticationError {
    error: string;
    error_code: number;
    error_description: string;
  }

  interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    mfa_trust_device_token: string;
    mfa_trust_device_token_expire_date: string;
  }

  const authenticate = async (requestBody: string) => {
    try {
      const response = await fetch(API_URL + "/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: requestBody,
      });

      if (response.ok) {
        const data: TokenResponse = await response.json();
        const token = data.access_token;
        const refreshToken = data.refresh_token;

        TokenService.setAccessToken(token);
        TokenService.setRefreshToken(refreshToken);

        const currentDate = new Date();
        const newDate = new Date(currentDate.getTime() + 1200 * 1000);
        TokenService.setRefreshTokenTimeout(newDate.toLocaleTimeString());
        setRefreshToken(newDate.toLocaleTimeString());
      }
    } catch (error) {
      const authenticationError = error as AuthenticationError;
      console.log(authenticationError.error);
    }
  };

  const handleLogin = async () => {
    const formData = new URLSearchParams();
    formData.append(GRANT_TYPE, PASSWORD);
    formData.append(USERNAME, username);
    formData.append(PASSWORD, password);

    authenticate(formData.toString());
  };

  const handleRefresh = async () => {
    var refreshTokendata = new URLSearchParams();
    refreshTokendata.append(GRANT_TYPE, REFRESH_TOKEN);
    refreshTokendata.append(REFRESH_TOKEN, TokenService.getRefreshToken()!);

    authenticate(refreshTokendata.toString());
  };

  return (
    <>
      {refreshToken && (
        <>
          <div>
            <button onClick={handleRefresh}>Refresh</button>
          </div>
          {"Token is valid until: " + refreshToken}
        </>
      )}

      <div className="container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default Login;
