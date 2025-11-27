import { BackendConfig } from "../config/BackendConfig";
import { HttpClient } from "../http/HttpClient";

export interface BoardTaskDTO {
    id: string;
    titulo: string;
    ordem: number;
    descricao: string;
    columnId: string;
}

export interface BoardColumnDTO {
    id: string;
    ordem: number;
    disciplineColumn: boolean;
    titulo: string;
    userId: string;
    tasks: BoardTaskDTO[];
}

export class BoardApi {
    private readonly httpClient: HttpClient;

    constructor(httpClient = new HttpClient(BackendConfig.getBaseUrl())) {
        this.httpClient = httpClient;
    }

    async listColumns(): Promise<BoardColumnDTO[]> {
        return this.httpClient.get<BoardColumnDTO[]>("/board/column", this.getAuthHeaders());
    }

    private getAuthHeaders(): Record<string, string> {
        const token = localStorage.getItem("accessToken");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
}
