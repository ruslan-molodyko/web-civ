/**
 * Created by Lancelot on 19.03.2017.
 */
import { Cell } from '../map/cell';
import { CellRenderer } from './CellRenderer';
import { Canvas } from './Canvas';

export class GridRenderer {
    cells: Cell[] = [];
    x: number = 100;
    y: number = 100;

    constructor(
        protected canvas: Canvas,
        protected cellRenderer: CellRenderer
    ) {}

    addCell(cell: Cell) {
        this.cells.push(cell);
    }

    render() {
        for (let cell of this.cells) {
            this.canvas.context().save();
            this.canvas.context().translate(this.x, this.y);

            this.cellRenderer.render(cell);

            this.canvas.context().restore();
        }
    }
}
