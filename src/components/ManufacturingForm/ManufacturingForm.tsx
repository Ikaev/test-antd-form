import {Button, Col, Divider, Form, Input, InputNumber, Row, Select, Space, Typography} from "antd";
import {BarChartOutlined, InfoCircleTwoTone} from '@ant-design/icons';
import data from "../../features.json"
import { FinishItem, MaterialItem} from "./types";
import {ColorCustomOption} from "../ColorCustomOption/ColorCustomOption";
import {useManufacturingFormHandlers} from "./hooks";
import {getMaterialsByProcessId, getOptions} from "./helpers";
import { FORM_FIELDS } from "./types";

import styles from "./ManufacturingForm.module.css"

export const ManufacturingForm = () => {
	const {processes, finishes, materials} = data
	const {form, handleFinishForm, handleFinishChange, handleMaterialChange, handleProcessChange} = useManufacturingFormHandlers()

	return (
		<Form form={form} layout="vertical" name="manufacturing-form" onFinish={handleFinishForm}>
			<Space size={80} align="center" className={styles.headerContainer}>
				<Typography.Text strong>Manufacturing Process / Material</Typography.Text>
				<Space align="center">
					<Typography.Text strong>Quantity: </Typography.Text>
					<Form.Item name={FORM_FIELDS.quantity} noStyle>
						<InputNumber placeholder="0" min={0} addonAfter={<BarChartOutlined className={styles.quantityIcon}/>}/>
					</Form.Item>
				</Space>
			</Space>
			<Form.Item
				name={FORM_FIELDS.processId}
				tooltip={{title: "some help text", icon: <InfoCircleTwoTone/>}}
				label="Technology:"
			>
				<Select placeholder="Select technology" onChange={handleProcessChange} options={getOptions(processes.filter((process) => process.active))}/>
			</Form.Item>
			<Form.Item noStyle dependencies={[FORM_FIELDS.processId]}>
				{({getFieldValue}) => {
					const processId = getFieldValue(FORM_FIELDS.processId)
					const materialList: MaterialItem[] = getMaterialsByProcessId(processId, materials)
					return (
						<Form.Item
							name={FORM_FIELDS.materialId}
							tooltip={{title: "some help text", icon: <InfoCircleTwoTone/>}}
							label="Material:"
						>
							<Select placeholder="Select material" onChange={handleMaterialChange} options={getOptions(materialList)}/>
						</Form.Item>
					)
				}}
			</Form.Item>
			<Row>
				<Col span={15}>
					<Form.Item noStyle dependencies={[FORM_FIELDS.materialId]}>
						{({getFieldValue}) => {
							const currentMaterialId = getFieldValue(FORM_FIELDS.materialId)
							let colors: string[] = []
							let isCustom: boolean = true
							let infills: string[] = []
							if (currentMaterialId) {
								const currentMaterial = materials.filter((item) => item.id === +currentMaterialId)[0]
								colors = currentMaterial.color
								infills = currentMaterial.infill
								isCustom = currentMaterial.isCustom
							}
							return (
								<>
									{isCustom &&
                  <Form.Item name={FORM_FIELDS.customMaterial} label="Custom material:">
                      <Input placeholder="Custom material"/>
                  </Form.Item>
									}
									{colors.length > 0 &&
                  <Form.Item name={FORM_FIELDS.color} label="Color:" rules={[{required: true, message: 'Please chose color'}]}>
                      <Select>
												{colors.map((color, key) =>
													<Select.Option value={color} key={key}>
														<ColorCustomOption color={color}/>
													</Select.Option>)}
                      </Select>
                  </Form.Item>
									}
									{infills.length > 0 &&
                  <Form.Item name={FORM_FIELDS.infill} label="Infill:" rules={[{required: true, message: 'Please chose infill'}]}>
                      <Select>
												{infills.map((infill, key) => <Select.Option value={infill} key={key}>{infill}</Select.Option>)}
                      </Select>
                  </Form.Item>
									}
								</>
							)
						}}
					</Form.Item>
				</Col>
			</Row>
			<Divider/>
			<Typography.Paragraph strong>Advance Features</Typography.Paragraph>
			<Row>
				<Col span={15}>
					<Form.Item noStyle dependencies={[FORM_FIELDS.materialId]}>
						{({getFieldsValue}) => {
							const {materialId, finishId} = getFieldsValue([FORM_FIELDS.materialId, FORM_FIELDS.finishId])
							let finishList: FinishItem[] = []
							let isCustom: boolean = true
							if (materialId) {
								finishList = finishes.filter((finish) => !finish.restrictedMaterials.includes(+materialId))
							}
							if (finishId) {
								const currentFinish = finishes.filter((item) => item.id === +finishId)[0]
								isCustom = currentFinish.isCustom
							}
							return (
								<>
									<Form.Item name={FORM_FIELDS.finishId} label="Finish:">
										<Select placeholder="Select finish" onChange={handleFinishChange}>
											{finishList.map(({name, id}) => (
												<Select.Option key={id} value={id}>
													{name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									{isCustom &&
                  <Form.Item name={FORM_FIELDS.customFinish} label="Custom finish:">
                      <Input placeholder="Enter"/>
                  </Form.Item>}
								</>
							)
						}}
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={8}>
					<Form.Item name={FORM_FIELDS.threads} label="Threads And Tapped Holes">
						<InputNumber placeholder="0" min={0} className={styles.inputNumber}/>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={8}>
					<Form.Item name={FORM_FIELDS.inserts} label="Inserts">
						<InputNumber placeholder="0" min={0} className={styles.inputNumber}/>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={15}>
					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Save Properties
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	)
}
