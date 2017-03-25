/* tslint:disable:no-unused-variable */

/*
 * mocha tests dist-server/*.test.js --recursive --watch
 */

import * as chai from 'chai';
let expect = chai.expect;
import * as sinon from 'sinon';
import * as WebSocket from 'ws';
import { Server } from 'ws';

import SinonExpectation = sinon.SinonExpectation;
import SinonMock = sinon.SinonMock;

import { Observable } from 'rxjs/Observable';
import { TransportService } from './transport.service';
import { MessageInterface } from '../interfaces/message.interface';
import { ClientInterface } from '../interfaces/client.interface';

describe('Transport service test', () => {

	let port: number = 7681;
    let server: Server;

    beforeEach(() => {
        server = new WebSocket.Server({ port });
    });

    it('On message subscribe', () => {
    	let listener = new TransportService(server);
    	expect(listener.onMessage$).to.be.instanceof(Observable);
    });

    it('Send boradcast message', () => {
        let serverSpy = sinon.spy(server, 'send');
    	let listener = new TransportService(server);
        let message: MessageInterface = <MessageInterface>{
            type: 0,
            sourceClient: <ClientInterface>{
                id: 'id_123',
                name: 'ruslan'
            },
            message: {some: 'object'}
        };
        listener.send(message);

        expect(serverSpy.calledOnce).to.be.true;
        expect(serverSpy.calledWith(JSON.stringify(message))).to.be.true;
    });
});