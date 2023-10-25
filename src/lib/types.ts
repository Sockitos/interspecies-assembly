export interface JSONMessage {
	content: string;
	name?: string | undefined;
}

export interface Message {
	id: number;
	author: string;
	text: string;
}
