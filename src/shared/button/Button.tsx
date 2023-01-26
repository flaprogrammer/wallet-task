import styles from './Button.module.css';

type Props = {
  label: string;
  [prop: string]: any;
};

export function Button(props: Props) {
  const { label, ...htmlProps } = props;
  return (
    <button className={styles.button} {...htmlProps}>
      {label}
    </button>
  );
}
