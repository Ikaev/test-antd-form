import {MaterialItem} from "./types";

export const getMaterialsByProcessId = (id: string, materials: MaterialItem[]) => {
	return materials.filter(({processId, active}) => processId === +id && active)
}

export const getOptions = (list: any[]) => {
	return list.map((item) => ({label: item.name, value: item.id}))
}
