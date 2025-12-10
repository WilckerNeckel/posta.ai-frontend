import { BackendConfig } from "../config/BackendConfig";
import { HttpClient } from "../http/HttpClient";

export interface DisciplineDTO {
  id: string;
  name: string;
  curso: string;
  professorId?: string | null;
}

export class DisciplineApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient = new HttpClient(BackendConfig.getBaseUrl())) {
    this.httpClient = httpClient;
  }

  async getMyDisciplines(): Promise<DisciplineDTO[]> {
    return this.httpClient.get<DisciplineDTO[]>(
      "/disciplines/me",
      this.getAuthHeaders()
    );
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
