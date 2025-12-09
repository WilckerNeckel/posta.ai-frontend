import { BackendConfig } from "../config/BackendConfig";
import { HttpClient } from "../http/HttpClient";

export interface UserDTO {
  id: string;
  matricula: string;
  disciplinas: string[];
  role: string;
  nome: string;
  curso: string;
  dataAdmissao: string;
}

export class UserApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient = new HttpClient(BackendConfig.getBaseUrl())) {
    this.httpClient = httpClient;
  }

  async getCurrentUser(): Promise<UserDTO> {
    return this.httpClient.get<UserDTO>("/users/me", this.getAuthHeaders());
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
