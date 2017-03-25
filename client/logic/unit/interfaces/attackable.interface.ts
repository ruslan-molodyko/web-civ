
import { CellCoordModel } from '../../location/cell/cell-coord.model';

export interface AttackableInterface {
	attack(coord: CellCoordModel);
}