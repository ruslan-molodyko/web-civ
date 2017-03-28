/* tslint:disable:no-unused-variable */

import * as chai from 'chai';
let expect = chai.expect;
import * as sinon from 'sinon';
import { CommandExecurtorService } from '../command-executor.service';
import { MessageInterface } from '../../interfaces/message.interface';
import { ClientInterface } from '../../interfaces/client.interface';
import { GlobalMapCommand } from './global-map.command';
import { GlobalMapActions } from './global-map.actions';
import { GlobalMapService } from '../../map/global-map.service';

import SinonExpectation = sinon.SinonExpectation;
import SinonMock = sinon.SinonMock;

describe('Global map command test', () => {

    it('Action not found', () => {

        let globalMapService: GlobalMapService = <any>{setCell: () => {}};
        let setMapStub = sinon.spy(globalMapService, 'setCell');

        let command: GlobalMapCommand = new GlobalMapCommand(globalMapService);

        let message: MessageInterface = <MessageInterface>{
            type: 100
        };

        expect(() => {
            command.execute(message);
        }).to.throw(/Action \d* not implemented/);


        expect(setMapStub.notCalled).to.be.true;

        setMapStub.restore();
    });

    it('Set cell action', () => {

        let globalMapService: GlobalMapService = <any>{setCell: () => {}};
        let setMapStub = sinon.spy(globalMapService, 'setCell');

    	let command: GlobalMapCommand = new GlobalMapCommand(globalMapService);

        let message: MessageInterface = <MessageInterface>{
            type: GlobalMapActions.ACTION_SET_CELL,
            sourceClient: <ClientInterface>{
                id: 'id_123',
                name: 'ruslan'
            },
            message: {
                cell: {
                coord: {
                    x: 0,
                    y: 0
                }
            }}
        };

        command.execute(message);

        expect(setMapStub.calledOnce).to.be.true;
        expect(setMapStub.calledWith(message.message.cell)).to.be.true;
        setMapStub.restore();
    });

    it('Get cell action', () => {

        let globalMapService: GlobalMapService = <any>{getCell: () => {}};
        let getMapStub = sinon.stub(globalMapService, 'getCell').returns({
                coord: {
                    x: 0,
                    y: 0
                }
            });

        let command: GlobalMapCommand = new GlobalMapCommand(globalMapService);

        let message: MessageInterface = <MessageInterface>{
            type: GlobalMapActions.ACTION_GET_CELL,
            sourceClient: <ClientInterface>{
                id: 'id_123',
                name: 'ruslan'
            },
            message: {
                coord: {
                    x: 0,
                    y: 0
                }
            }
        };

        let result: any = command.execute(message);

        expect(result).to.be.eql({
            coord: {
                x: 0,
                y: 0
            }
        });
        expect(getMapStub.calledOnce).to.be.true;
        expect(getMapStub.calledWith(message.message.coord)).to.be.true;

        getMapStub.restore();
    });
});
