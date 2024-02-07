"use client"

interface InputProps {
    type?: string,
    value?: string,
    onChange?: (value: any) => void,
    placeholder?: string,
}

const Input = ({ type="text", value, onChange, placeholder }: InputProps) => {
    const className = `
                p-3 my-2
                border 
                border-gray-200 
                rounded w-full 
                focus:outline-none 
                focus:bg-white 
                focus:border-blue-500
                `;

    return (
        <input
            type={type}
            value={value}
            className={className}
            placeholder={placeholder}
            onChange={(e) => { onChange && onChange(e.target.value); }}
        />
    );
}

export default Input;