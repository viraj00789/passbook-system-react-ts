"use client"
interface ButtonProps {
    title: string;
    buttonType: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    title = "",
    buttonType = "button",
    onClick,
    className = "",
}) => {
    return (
        <button
            className={`w-full rounded-md
                bg-primary
                px-3 py-2 lg:py-3 lg:px-4
                text-md font-bold
                text-black
                hover:bg-primary-600
                transition
                cursor-pointer ${className}`}
            type={buttonType}
            onClick={onClick}
        >
            {title}
        </button>
    );
};