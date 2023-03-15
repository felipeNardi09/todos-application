interface BtnProps {
  btnName: string;
  type?: "button" | "submit" | "reset" | undefined;
  classes: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
}

export default function Button({
  btnName,
  type,
  classes,
  onClick,
  disabled,
}: BtnProps) {
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {btnName}
    </button>
  );
}
