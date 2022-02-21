import styles from "./columnItem.module.css";
type ColumnItemProps = {
  currentRow: number;
  properties?: React.CSSProperties;
};
const ColumnItem = ({ currentRow, properties }: ColumnItemProps) => (
  <input
    className={styles.input}
    style={{ ...properties }}
    type="text"
    id={`row-${currentRow}`}
  />
);
export default ColumnItem;
