/**
 * Created by Lancelot on 19.03.2017.
 */
import { Cell } from "../map/cell";
import { Canvas } from './Canvas';
import { Dot } from './Dot';

export class CellRenderer {

    static COUNT_SIDES: number = 6;

    constructor(protected canvas: Canvas, protected radius: number = 30) { }

    render(cell: Cell) {

        // debugger;
        let cellCenter = this.cellIndexToCenterPosition(cell);

        // this.canvas.context().beginPath();
        // this.canvas.context().arc(cellCenter.x, cellCenter.y, this.radius, 0, 2 * Math.PI);
        // this.canvas.context().stroke();

        this.canvas.context().save();
        this.canvas.context().beginPath();

        this.canvas.context().translate(cellCenter.x, cellCenter.y);
        this.canvas.context().translate(0.5, 0.5);
        this.canvas.context().moveTo(this.radius, 0);

        for (let i = 1; i < CellRenderer.COUNT_SIDES; i++) {
            this.canvas.context().lineTo(this.radius * Math.cos(this.angle() * i), this.radius * Math.sin(this.angle() * i));
        }

        this.canvas.context().closePath();
        this.canvas.context().stroke();
        this.canvas.context().restore();
    }

    protected cellIndexToCenterPosition(cell: Cell): Dot {
        let isOddCell: boolean = (cell.indexCell + 1) % 2 === 0;
        return new Dot(
            ((this.radius - this.horizontalDelta()) * cell.indexCell)
                + (this.radius * cell.indexCell)
                + (this.radius),
            ((this.radius - this.verticalDelta()) * cell.indexRow)
                + ((this.radius - this.verticalDelta()) * (cell.indexRow + 1))
                + (isOddCell ? this.radius - this.verticalDelta() : 0),
        );
    }

    protected verticalDelta() {
        return this.radius * (1 - Math.cos(this.angle() * 0.5));
    }

    protected horizontalDelta() {
        return this.radius * (1 - Math.cos(this.angle()));
    }

    protected angle(): number {
        return ((Math.PI * 2) / CellRenderer.COUNT_SIDES);
    }
}
