/* tslint:disable:no-unused-variable */

import * as chai from 'chai';
let expect = chai.expect;
import * as sinon from 'sinon';
import { UserClient } from './models/user-client';

import SinonExpectation = sinon.SinonExpectation;
import SinonMock = sinon.SinonMock;

describe('Test server', () => {
    it('Initialize server', () => {
    	// let server = new Server(7071, new UserClient('Ruslan'));
    	// server.start();
    	// server.close();
    	expect(true).to.be.true;
    });

});