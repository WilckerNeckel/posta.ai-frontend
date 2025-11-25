export class BackendConfig {
    private static readonly baseUrl =
        (import.meta.env.VITE_BACKEND_URL as string | undefined) ?? "";

    static getBaseUrl(): string {
        if (!this.baseUrl) {
            throw new Error(
                "VITE_BACKEND_URL não está configurada. Defina a URL do backend no arquivo .env."
            );
        }

        return this.baseUrl.replace(/\/$/, "");
    }
}
