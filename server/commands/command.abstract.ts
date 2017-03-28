import { MessageInterface } from '../interfaces/message.interface';

export abstract class CommandAbstract {

	actionClass: Function;
	abstract execute(message: MessageInterface): MessageInterface|null ;

	protected actionTypeNotImplementedError(type: number) {
		throw new Error(`Action ${type} not implemented`);
	}
}