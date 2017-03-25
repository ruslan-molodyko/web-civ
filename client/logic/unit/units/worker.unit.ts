
import { UnitAbstract } from '../unit.abstract';
import { MovableInterface } from '../interfaces/movable.interface';
import { AttackableInterface } from '../interfaces/attackable.interface';
import { CellCoordModel } from '../../location/cell/cell-coord.model';

export interface WorkerUnit {
	
}

export class WorkerUnitHandler extends UnitAbstract implements MovableInterface {
	move(coord: CellCoordModel) {}	
}