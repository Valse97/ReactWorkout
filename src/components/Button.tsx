import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
    active?: boolean,
    children: ReactNode,
    onClick: MouseEventHandler | undefined;
}

const Button: React.FC<ButtonProps> = ({ active, children, onClick}) => {
    
    let _class = "hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 mt-3 px-4 border border-blue-500 hover:border-transparent rounded";

    if(active){
        _class += " bg-blue-500";
    }else{
        _class += " bg-transparent";
    }

    return (
        <button className={_class}  onClick={onClick}>{children}</button>
    );
};

export default Button;