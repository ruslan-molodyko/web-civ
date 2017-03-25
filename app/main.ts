import { GridRenderer } from './render/GridRenderer';
import { Canvas } from './render/Canvas';
import { CellRenderer } from './render/CellRenderer';
import { Cell } from './map/cell';

const canvas = new Canvas(<HTMLCanvasElement>document.getElementById('canvas'));
const cellRenderer = new CellRenderer(canvas);
const gridRenderer = new GridRenderer(canvas, cellRenderer);

for (let i = 0; i <= 15; i++) {
    for (let j = 0; j <= 15; j++) {
        let cell = new Cell();
        cell.indexRow = i;
        cell.indexCell = j;
        gridRenderer.addCell(cell);
    }
}

let scaleParam: number = 0.5;

function draw() {
    requestAnimationFrame(draw);
    // Drawing code goes here

    canvas.context().clearRect(0, 0, canvas.canvas().width, canvas.canvas().height);
    canvas.context().save();
    canvas.context().scale(scaleParam, scaleParam);
    gridRenderer.render();
    canvas.context().restore();
}
draw();

//canvas.context().stroke();

let scale: HTMLInputElement = <HTMLInputElement>document.getElementById('scale');
scale.onchange = (event: Event) => {
    let value: number =  (<any>event.target).value;
    scaleParam = value / 10;
    console.log(scaleParam);
};


