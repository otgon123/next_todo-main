"use client"

interface ClickButtonProps {
    label: string;
    onClick: (props?: any) => void;
    disabled?: boolean;
}

const ClickButton = ({ label, onClick, disabled }: ClickButtonProps) => {
    const baseClass = "w-full text-white py-3 px-4 mb-2 rounded";
    const enableClass = `${baseClass} bg-black hover:bg-gray-700`;
    const disableClass = `${baseClass} bg-gray-200`;

    return (
        <button
            className={disabled ? disableClass : enableClass}
            onClick={onClick}
            disabled={disabled}
        >{label}</button>
    );
}

export default ClickButton;