import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  active?: boolean;
  children: ReactNode;
  onClick: MouseEventHandler | undefined;
  className?: string | undefined;
}

const Button: React.FC<ButtonProps> = ({
  active,
  children,
  onClick,
  className,
}) => {
  let _class = `
  
  hover:bg-blue-600 bg-blue-400 dark:bg-blue-700
  
  text-black dark:text-white
  
  font-semibold py-0 mt-3 px-4 mx-1 rounded
     `;

  //   if (active) {
  //     _class += " bg-blue-500";
  //   } else {
  //     _class += " bg-transparent";
  //   }

  if (className?.length) {
    _class += ` ${className}`;
  }

  return (
    <button className={_class} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
