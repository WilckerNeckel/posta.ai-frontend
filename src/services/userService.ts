import { UserApi, UserDTO } from "../backend/user/UserApi";
import { ApiError } from "../backend/http/ApiError";

export class UserService {
  static async getCurrentUser(): Promise<UserDTO> {
    try {
      const api = new UserApi();
      return await api.getCurrentUser();
    } catch (error) {
      console.error("❌ Erro ao buscar usuário:", error);
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }
}
