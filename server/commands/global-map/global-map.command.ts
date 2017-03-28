import { CommandAbstract } from '../command.abstract';
import { GlobalMapActions } from './global-map.actions';
import { MessageInterface } from '../../interfaces/message.interface';
import { GlobalMapService } from '../../map/global-map.service';

export class GlobalMapCommand extends CommandAbstract {

	actionClass: Function = GlobalMapActions;

	constructor(protected globalMapService: GlobalMapService) {
		super();
	}

	execute(message: MessageInterface): MessageInterface|null {
		switch (message.type) {
			case GlobalMapActions.ACTION_GET_CELL:
				return this.globalMapService.getCell(message.message.coord);
				break;
			case GlobalMapActions.ACTION_SET_CELL:
				return this.globalMapService.setCell(message.message.cell);
				break;
			
			default:
				this.actionTypeNotImplementedError(message.type);
		}
		return null;
	}
}