
export abstract class Serializable {
	serialize() {
		let object: any = {};
		for (let property in this) {
			if (this.hasOwnProperty(property)) {
				object[property] = this[property];
			}
		}

		return JSON.stringify(object);
	}

	unserialize() {
		return;
	}
}