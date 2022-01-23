import {Form} from "antd";

export const useManufacturingFormHandlers = () => {
	const [form] = Form.useForm()

	const handleFinishForm = (values: any) => {
		console.log(values)
	}

	const handleProcessChange = () => {
		form.resetFields(["materialId"])
	}

	const handleMaterialChange = () => {
		form.resetFields(["customMaterial", "color", "infill"])
	}

	const handleFinishChange = () => {
		form.resetFields(["customFinish"])
	}

	return {form, handleFinishChange, handleFinishForm, handleProcessChange, handleMaterialChange}
}
