/* tslint:disable:no-unused-variable */

/*
 * mocha tests dist-server/*.test.js --recursive --watch
 */

import * as chai from 'chai';
let expect = chai.expect;
import * as sinon from 'sinon';
import * as WebSocket from 'nodejs-websocket';
import { Connection } from 'nodejs-websocket';

import SinonExpectation = sinon.SinonExpectation;
import SinonMock = sinon.SinonMock;

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';


import { TransportService } from './transport.service';
import { MessageInterface } from '../interfaces/message.interface';
import { ClientInterface } from '../interfaces/client.interface';

describe('Transport service test', () => {

	let port: number = 7681;
    let url: string = 'ws://127.0.0.1:' + port;
    let host: string = '127.0.0.1';
    let server: any;
    let listener: TransportService;

    beforeEach(() => {
        server = WebSocket;
        listener = new TransportService(server);
        listener.listen(port, host);
    });

    afterEach(() => {
        listener.server.close();
    });

    it('On message right instance', () => {
    	expect(listener.onMessage$).to.be.instanceof(Subject);
    });


    it('On message test', (done: () => void) => {

        let message: MessageInterface = <MessageInterface>{
            type: 0,
            sourceClient: <ClientInterface>{
                id: 'id_123',
                name: 'ruslan'
            },
            message: {some: 'object'}
        };

        let connection: Connection = WebSocket.connect(url, {}, () => {
            connection.send(JSON.stringify(message));
            connection.close();

            listener.onMessage$.subscribe((messageLocal: MessageInterface) => {
                expect(messageLocal).to.be.eql(message);
                done();
            });
        });
    });

    it('Send message to target from server', (done: () => void) => {

        let client1 = <ClientInterface>{id: 'id_123', name: 'ruslan'};
        let client2 = <ClientInterface>{id: 'id_456', name: 'ramthes'};

        let message1: MessageInterface = <MessageInterface>{
            type: 0,
            sourceClient: client1,
            targetClient: client2,
            message: {some: 'object'}
        };

        let message2: MessageInterface = <MessageInterface>{
            type: 0,
            sourceClient: client2,
            message: {another: 'object'}
        };

        listener.onMessage$.subscribe((messageLocal: MessageInterface) => {
            listener.send(messageLocal);
        });


        let connection2: Connection = WebSocket.connect(url, {}, () => {
            connection2.send(JSON.stringify(message2));
            let connection1: Connection = WebSocket.connect(url, {}, () => {
                connection1.send(JSON.stringify(message1));
                connection1.on('text', (text: string) => { throw new Error('Should not be called'); });
            });

            connection2.on('text', (text: string) => {

                expect(text).to.be.eql(JSON.stringify(message1));

                connection1.close();
                connection2.close();

                done();
            });
        });
    });

    it('Send broadcast message from server', (done: () => void) => {

        let client1 = <ClientInterface>{id: 'id_123', name: 'ruslan'};
        let client2 = <ClientInterface>{id: 'id_456', name: 'ramthes'};
        let client3 = <ClientInterface>{id: 'id_456', name: 'rustam'};

        let message1: MessageInterface = <MessageInterface>{
            type: 0,
            sourceClient: client1,
            message: {some: 'object'}
        };

        let message2: MessageInterface = <MessageInterface>{
            type: 0,
            sourceClient: client2,
            message: {another: 'object'}
        };

        let message3: MessageInterface = <MessageInterface>{
            type: 0,
            sourceClient: client3,
            message: {other: 'object'}
        };

        let messageBroadCast: MessageInterface = <MessageInterface>{
            type: 1,
            sourceClient: client3,
            message: {other: 'object'}
        };

        let subject = new Subject(),
            connection1: Connection,
            connection2: Connection 
        ;

        let connection3: Connection = WebSocket.connect(url, {}, () => {
            connection3.send(JSON.stringify(message3));
            connection3.on('text', (text: string) => { 
                subject.next(text);
            });
            connection2 = WebSocket.connect(url, {}, () => {
                connection2.send(JSON.stringify(message2));
                connection2.on('text', (text: string) => { 
                    subject.next(text);
                });
                connection1 = WebSocket.connect(url, {}, () => {
                    connection1.send(JSON.stringify(message3), () => {
                        listener.broadcast(messageBroadCast);
                    });
                    connection1.on('text', (text: string) => { 
                        subject.next(text);

                    });
                });
            });
        });

        subject
            .filter((text: string) => JSON.parse(text).type === messageBroadCast.type)
            .take(3)
            .subscribe(() => {}, () => {}, () => {
                connection1.close();
                connection2.close();
                connection3.close();

                done();
            });
    });
});