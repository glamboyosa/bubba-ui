import styles from './columnItem.module.css'
type ColumnItemProps = {
  currentRow: number
  disabled: boolean
}
const ColumnItem = ({ currentRow, disabled }: ColumnItemProps) => (
  <input
    className={styles.input}
    type="text"
    id={`row-${currentRow}`}
    disabled={disabled}
  />
)
export default ColumnItem
