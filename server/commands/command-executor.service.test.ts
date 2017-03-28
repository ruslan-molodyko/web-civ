/* tslint:disable:no-unused-variable */

import * as chai from 'chai';
let expect = chai.expect;
import * as sinon from 'sinon';
import { CommandExecurtorService } from './command-executor.service';
import { MessageInterface } from '../interfaces/message.interface';
import { ClientInterface } from '../interfaces/client.interface';
import { GlobalMapActions } from './global-map/global-map.actions';
import { GlobalMapCommand } from './global-map/global-map.command';


import SinonExpectation = sinon.SinonExpectation;
import SinonMock = sinon.SinonMock;

class SomeActions {
    static ACTION_FIRST: number = 1;
    static ACTION_SECOND: number = 2;
    static ACTION_FIVE: number = 5;
}

class SomeActions2 {
    static ACTION_FIRST: number = 10;
    static ACTION_SECOND: number = 20;
    static ACTION_FIVE: number = 50;
}

describe('Command executor service', () => {

    it('Get constant values', () => {
        let commandExecutor: CommandExecurtorService = new CommandExecurtorService([]);
        expect((<any>commandExecutor).getConstantValues(SomeActions)).to.be.eql([1, 2, 5]);
    });

    it('Execute the command', () => {

        let globalMapCommand1: GlobalMapCommand = <any>{execute: () => {}, actionClass: SomeActions};
        let globalMapCommand2: GlobalMapCommand = <any>{execute: () => {}, actionClass: SomeActions2};

        let executeStub1 = sinon.stub(globalMapCommand1, 'execute');
        let executeStub2 = sinon.stub(globalMapCommand2, 'execute');

        executeStub1.returns('message1');
        executeStub2.returns('message2');

        let commandExecutor: CommandExecurtorService = new CommandExecurtorService([
            <any>globalMapCommand1,
            <any>globalMapCommand2
        ]);

        let message: MessageInterface = <MessageInterface>{
            type: SomeActions.ACTION_FIVE,
            sourceClient: <ClientInterface>{
                id: 'id_123',
                name: 'ruslan'
            },
            message: {some: 'object'}
        };

        let result: any = commandExecutor.execute(message);

        expect(result).to.be.equal('message1');
        expect(executeStub1.calledOnce).to.be.true;
        expect(executeStub1.calledWith(message)).to.be.true;
        expect(executeStub2.notCalled).to.be.true;

        executeStub1.restore();
        executeStub2.restore();
    });

    it('Action type not found', () => {
        let globalMapCommand1: GlobalMapCommand = <any>{execute: () => {}, actionClass: SomeActions};
        let executeStub1 = sinon.stub(globalMapCommand1, 'execute');

        let commandExecutor: CommandExecurtorService = new CommandExecurtorService([
            <any>globalMapCommand1,
        ]);

        let commandExecutorSpy1 = sinon.spy(commandExecutor, 'execute');

        let message: MessageInterface = <MessageInterface>{
            type: SomeActions2.ACTION_FIVE,
            sourceClient: <ClientInterface>{
                id: 'id_123',
                name: 'ruslan'
            },
            message: {some: 'object'}
        };

        expect(() => {
            let result: any = commandExecutor.execute(message);
        }).to.throw(/Action \d* not implemented/);


        expect(executeStub1.notCalled).to.be.true;
        expect(commandExecutorSpy1.threw()).to.be.true;

        executeStub1.restore();
        commandExecutorSpy1.restore();
    });
});
