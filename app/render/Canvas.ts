/**
 * Created by Lancelot on 20.03.2017.
 */
export class Canvas {

    protected _context: CanvasRenderingContext2D;

    constructor(protected _canvas: HTMLCanvasElement) {
        this._context = this._canvas.getContext("2d");
    }

    canvas() {
        return this._canvas;
    }

    context() {
        return this._context;
    }
}
