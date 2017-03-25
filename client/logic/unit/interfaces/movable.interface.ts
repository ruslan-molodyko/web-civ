
import { CellCoordModel } from '../../location/cell/cell-coord.model';

export interface MovableInterface {
	move(coord: CellCoordModel);
}