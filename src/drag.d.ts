import { ComponentInternalInstance } from 'vue';

export interface XDragRecord {
	instance: ComponentInternalInstance;
	index: number;
}

export type setSrcFunc = (src: XDragRecord | null) => void;
export type handleSortFunc = (target: XDragRecord) => void;
