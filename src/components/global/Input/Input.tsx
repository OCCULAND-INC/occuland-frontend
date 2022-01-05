import styles from './Input.module.css';

interface Props {
  className?: string;
  id?: string;
  placeholder?: string;
  requiried?: boolean;
  type?: string;
}

function Input({ id, className, requiried, type = 'text', ...rest }: Props) {
  return (
    <input
      id={id}
      type={type}
      className={`${styles.input} ${className}`}
      required={requiried}
      {...rest}
    />
  );
}

export default Input;
