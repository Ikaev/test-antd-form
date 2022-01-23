export interface MaterialItem {
	id: number,
	processId: number,
	name: string,
	color: string[],
	infill: string[],
	tolerance: {
		default?: number,
		options?: number[]
	},
	active: boolean,
	isCustom: boolean
}

export interface FinishItem {
	id: number,
	processId: number,
	name: string,
	restrictedMaterials: number[],
	isCustom: boolean
}

export interface ProcessItem {
	id: number,
	name: string,
	active: boolean
}

export enum FORM_FIELDS {
	quantity = "quantity",
	processId = "processId",
	materialId = "materialId",
	customMaterial = "customMaterial",
	color = "color",
	infill = "infill",
	finishId = "finishId",
	customFinish = "customFinish",
	threads = "threads",
	inserts = "inserts"

}
