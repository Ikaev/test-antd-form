import styles from "./ColorCustomOption.module.css"

export const ColorCustomOption = ({color}: {color: string}) => {
	const colorName = color[0].toUpperCase() + color.slice(1)
	return (
		<div className={styles.container}>
			<div className={styles.icon} style={{background: color}}/>
			<span>{colorName}</span>
		</div>
	)
}
