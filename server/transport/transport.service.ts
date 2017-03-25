import { Server } from 'ws';

export class TransportService {
	constructor(protected server: Server) {
		// const wss = new WebSocket.Server({ port });

		// wss.on('connection', function connection(ws) {
		//   ws.on('message', function incoming(message) {
		//     console.log('received: %s', message);
		//   });

		//   ws.send('something');
		// });
	}
}