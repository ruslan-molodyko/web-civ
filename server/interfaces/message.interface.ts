
import { ClientInterface } from './client.interface';

export interface MessageInterface {

	type: number;
	
	targetClient?: ClientInterface;
	sourceClient?: ClientInterface;

	message: any;
}