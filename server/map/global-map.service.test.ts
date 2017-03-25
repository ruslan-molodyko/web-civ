/* tslint:disable:no-unused-variable */

/*
 * mocha tests dist-server/*.test.js --recursive --watch
 */

import * as chai from 'chai';
let expect = chai.expect;
import * as sinon from 'sinon';
import { GlobalMapService } from './global-map.service';

import SinonExpectation = sinon.SinonExpectation;
import SinonMock = sinon.SinonMock;

import { CellModel } from '../../client/logic/location/cell/cell.model';
import { CellCoordModel } from '../../client/logic/location/cell/cell-coord.model';
import { GlobalMapModel } from './global-map.model';

describe('Global map service', () => {

	let mapService: GlobalMapService;
	let countHorizonalCells: number = 20;
	let countVerticalCells: number = 10;

	beforeEach(() => {
		mapService = new GlobalMapService();
	});

    it('Creating the map', () => {

    	mapService.create(countHorizonalCells, countVerticalCells);
    	
    	let mapModel: CellModel[][] = mapService.getMap();

    	expect(mapModel.length).to.be.eql(countHorizonalCells);
    	expect(mapModel[0].length).to.be.eql(countVerticalCells);
    });

    it('Set/Get cell on the map' , () => {

    	mapService.create(countHorizonalCells, countVerticalCells);
    	let mapModel: GlobalMapModel = mapService.getMap();
    	let cellModel = <CellModel>{coord: <CellCoordModel>{x: 2, y: 3}};

    	mapService.setCell(cellModel);
    	expect(mapService.getCell(<CellCoordModel>{x: 2, y: 3})).to.be.equal(cellModel);
    });
});