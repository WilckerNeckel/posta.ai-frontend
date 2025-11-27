import { BackendConfig } from "../config/BackendConfig";
import { HttpClient } from "../http/HttpClient";

export interface LoginRequestDTO {
    usuario: string;
    senha: string;
}

export interface LoginResponseDTO {
    accessToken: string;
}

export class AuthApi {
    private readonly httpClient: HttpClient;

    constructor(httpClient = new HttpClient(BackendConfig.getBaseUrl())) {
        this.httpClient = httpClient;
    }

    async login(payload: LoginRequestDTO): Promise<LoginResponseDTO> {
        return this.httpClient.post<LoginRequestDTO, LoginResponseDTO>(
            "/auth/login",
            payload
        );
    }
}
