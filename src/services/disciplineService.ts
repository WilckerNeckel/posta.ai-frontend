import { DisciplineApi, DisciplineDTO } from "../backend/discipline/DisciplineApi";
import { ApiError } from "../backend/http/ApiError";

export class DisciplineService {
  static async getMyDisciplines(): Promise<DisciplineDTO[]> {
    try {
      const api = new DisciplineApi();
      return await api.getMyDisciplines();
    } catch (error) {
      console.error("❌ Erro ao buscar disciplinas do usuário:", error);
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }
}
