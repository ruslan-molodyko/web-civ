
import { MessageInterface } from '../interfaces/message.interface';
import { GlobalMapCommand } from '../commands/global-map/global-map.command';
import { GlobalMapActions } from '../commands/global-map/global-map.actions';
import { CommandAbstract } from './command.abstract';

export class CommandExecurtorService {

	constructor(protected handlers: CommandAbstract[]) {}

	execute(message: MessageInterface) {

		let result: MessageInterface|null = null;
		let isFoundHandler = false;
		this.handlers.forEach((handler: CommandAbstract) => {
			if (handler.actionClass && (this.getConstantValues(handler.actionClass).indexOf(message.type) !== -1)) {
				result = handler.execute(message);
				isFoundHandler = true;
				return false;
			}
		});

		if (!isFoundHandler) {
			this.actionTypeNotImplementedError(message.type);
		}

		return result;
	}

	protected actionTypeNotImplementedError(type: number) {
		throw new Error(`Action ${type} not implemented`);
	}

	protected getConstantValues(ActionClass: any) {
		let values: number[] = [];
		Object.keys(ActionClass).forEach((constantName: string) => {
			if (constantName.match(/^ACTION_.*$/)) {
				values.push(ActionClass[constantName]);
			}
		});
		return values;
	}
}