import { ApiError } from "./ApiError";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<TBody> {
    body?: TBody;
    headers?: Record<string, string>;
}

export class HttpClient {
    constructor(
        private readonly baseUrl: string,
        private readonly fetcher: typeof fetch = fetch
    ) {}

    async post<TRequest, TResponse>(
        path: string,
        body: TRequest,
        headers?: Record<string, string>
    ): Promise<TResponse> {
        return this.request<TRequest, TResponse>("POST", path, { body, headers });
    }

    private async request<TRequest, TResponse>(
        method: HttpMethod,
        path: string,
        options: RequestOptions<TRequest> = {}
    ): Promise<TResponse> {
        const url = this.buildUrl(path);

        const response = await this.fetcher(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        const responseBody = await this.parseResponse(response);

        if (!response.ok) {
            const errorMessage =
                (responseBody as { message?: string })?.message ??
                "Erro ao comunicar com o servidor.";
            throw new ApiError(errorMessage, response.status, responseBody);
        }

        return responseBody as TResponse;
    }

    private buildUrl(path: string): string {
        return `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    }

    private async parseResponse(response: Response) {
        const contentType = response.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
            return response.json().catch(() => ({}));
        }

        const text = await response.text();
        return text ? { message: text } : {};
    }
}
