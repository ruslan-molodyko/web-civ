import { Injectable } from '@angular/core';
import { CellCoordModel } from '../cell/cell-coord.model';
import { CellModel } from '../cell/cell.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class MapService {

	/**
	 * Set new cell data to the map
	 */
	public setCell(cell: CellModel) {}

	/** 
	 * Get and update cell in map
	 */
	public getCell(cellCoord: CellCoordModel) {
		return Observable.of(<CellModel>{});
	}

	/** 
	 * Get and update cell list in map
	 */
	public getCellList(cellCoordList: CellCoordModel[]) {
		return Observable.of(<CellModel>{});
	}

	/** 
	 * Subscribe when cell on the map will be updated
	 */
	public subscribeCell(cellCoord: CellCoordModel|CellCoordModel[]) {}
}