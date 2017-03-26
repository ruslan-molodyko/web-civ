
import { WebSocket, Connection, Server } from 'nodejs-websocket';
import { MessageInterface } from '../interfaces/message.interface';
import { ClientInterface } from '../interfaces/client.interface';
import { Subject } from 'rxjs/Subject';

export class TransportService {

	static CONNECTING = 0;
	static OPEN = 1;
	static CLOSING = 2;
	static CLOSED = 3;

	server: Server;
	clientConnectionList: {[clientId: string]: string[]} = {};
	onMessage$: Subject<MessageInterface> = new Subject();

	constructor(protected ws: WebSocket) {
		this.server = ws.createServer(this.onConnection.bind(this));
	}

	public listen(port: number, host: string) {
		this.server.listen(port, host);
	}

	public send(message: MessageInterface) {

		// Send message to particular client
		if (message.targetClient) {
			this.findConnectionByClient(message.targetClient, TransportService.OPEN)
			.forEach(((connection: Connection) => {
				connection.send(this.serializeMessage(message));
			}).bind(this));
		}
	}

	public broadcast(message: MessageInterface) {
		this.server.connections.forEach(((connection: Connection) => {
			connection.send(this.serializeMessage(message));
		}).bind(this));
	}

	protected onConnection(connection: Connection) {

		connection.on('text', ((text: string) => {
			this.onMessage(connection, this.unserializeMessage(text));
		}).bind(this));

		connection.on('close', ((code?: number, reason?: string) => {
			this.onClose(connection, code, reason);
		}).bind(this));
	}

	protected onMessage(connection: Connection, message: MessageInterface) {

		if (message.sourceClient) {
			// Add info about clients
			this.addClientConnection(message.sourceClient, connection);
		} else {
			throw new Error('Message should have source client');
		}

		this.onMessage$.next(message);
	}

	protected onClose(connection: Connection, code?: number, reason?: string) { 
		this.removeClientConnection(connection);
	}

	protected addClientConnection(client: ClientInterface, connection: Connection) {
		if (Object.keys(this.clientConnectionList).indexOf(client.id) === -1) {
			this.clientConnectionList[client.id] = [];
		}
		if (this.clientConnectionList[client.id].indexOf(connection.key) === -1) {
			this.clientConnectionList[client.id].push(connection.key);
		}
	}

	protected removeClientConnection(connection: Connection) {
		Object.keys(this.clientConnectionList).forEach((clientId: string) => {

			if (this.clientConnectionList[clientId].indexOf(connection.key) !== -1) {
				this.clientConnectionList[clientId] =
					this.clientConnectionList[clientId]
					.filter((connectionKey: string) => connectionKey !== connection.key);
			}

			// Remove client if this is last connection
			if (this.clientConnectionList[clientId].length === 0) {
				delete this.clientConnectionList[clientId];
			}
		});
	}

	protected findConnectionByClient(client: ClientInterface, requiredStatus?: number): Connection[] {
		let resultConnection: Connection[] = [];
		let clientConnections = this.clientConnectionList[client.id];

		// Check if such user has a connections
		if (Array.isArray(clientConnections) && (clientConnections.length > 0)) {
				
			this.server.connections.forEach(((connection: Connection) => {
				// Check if connection has required status if need
				if ((connection.readyState === requiredStatus) || (requiredStatus === undefined)) {
					// Get right connection list by user id
					if (clientConnections.indexOf(connection.key) !== -1) {
						resultConnection.push(connection);
					}
				}
			}).bind(this));
		}

		return resultConnection;
	}

	protected serializeMessage(message: MessageInterface): string {
		return JSON.stringify(message);
	}

	protected unserializeMessage(text: string): MessageInterface {
		return JSON.parse(text);
	}
}