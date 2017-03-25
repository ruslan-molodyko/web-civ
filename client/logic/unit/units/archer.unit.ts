
import { UnitAbstract } from '../unit.abstract';
import { MovableInterface } from '../interfaces/movable.interface';
import { AttackableInterface } from '../interfaces/attackable.interface';
import { CellCoordModel } from '../../location/cell/cell-coord.model';

export interface ArcherUnit {

}

export class ArcherUnitHandler extends UnitAbstract implements MovableInterface, AttackableInterface {
	move(coord: CellCoordModel) {}	
	attack(coord: CellCoordModel) {}	
}