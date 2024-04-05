import TokenService from "../services/token-service";

class HeaderUtilities{
    static addAuthorizationTokenHeader(headers:Headers) :Headers {
        headers.append('Authorization', 'Bearer ' + TokenService.getAccessToken());
        return headers;
    }
}
export default HeaderUtilities;