
declare module 'nodejs-websocket' {

	export class Connection {

		CONNECTING: number;
		OPEN: number;
		CLOSING: number;
		CLOSED: number;

		server: Server;
		readyState: number; 
		key: string; 

		sendText(str: string, cb?: () => void): void;
		send(str: string, cb?: () => void): void;
		close(code?: number, reason?: string): void;
		on(event: 'text', cb: (text: string) => void): void;
		on(event: 'close', cb: (code?: number, reason?: string) => void): void;
	}

	export class Server {
		listen(port: number, host?: string, onListeningEventCb?: () => void): void;
		close(cb?: () => void): void;
		connections: Connection[];
	}

	export function createServer(cb: (connection: Connection) => void): Server;
	export function connect(url: string, option?: any, cb?: (connection: Connection) => void): Connection;

	export class WebSocket {
		createServer(cb: (connection: Connection) => void): Server;
		connect(url: string, option?: any, cb?: (connection: Connection) => void): Connection;
	}
}
