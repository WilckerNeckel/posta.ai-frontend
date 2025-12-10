import { io, Socket } from "socket.io-client";
import { WebSocketPayloads } from "./types";
import { BackendConfig } from "../config/BackendConfig";

let socket: Socket<WebSocketPayloads> | null = null;

const getSocketBaseUrl = () => {
    const base = BackendConfig.getBaseUrl();
    // Remove possível sufixo /api para apontar para o host do websocket
    return base.replace(/\/api\/?$/, "");
};

export const connectSocket = () => {
    console.log("Conectando ao WebSocket...");
    if (socket && socket.connected) {
        console.log("WebSocket já conectado.");
        return socket;
    }

    const token = localStorage.getItem("accessToken");
    socket = io(getSocketBaseUrl(), {
        path: "/ws",
        auth: {
            token: token ? `Bearer ${token}` : undefined,
        },
        transports: ["websocket"],
    });

    return socket;
};

export const getSocket = () => socket;
