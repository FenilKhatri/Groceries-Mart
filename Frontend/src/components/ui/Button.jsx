import { Link } from "react-router-dom";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-semibold transition duration-300";

const variants = {
  primary: "bg-orange-500 text-white hover:bg-orange-600 hover:bg-orange-600",
  secondary:
    "bg-emerald-700 text-white hover:bg-emerald-600",
  outline:
    "border border-gray-300 text-black hover:border-emerald-500 hover:text-emerald-500",
};

const Button = ({
  children,
  to,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  icon,
  ...props
}) => {
  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles} {...props}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles} {...props}>
      {children}
      {icon}
    </button>
  );
};

export default Button;
