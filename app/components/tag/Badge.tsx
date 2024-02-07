import React from 'react'
import clsx from 'clsx'

const types = {
    default: 'bg-gray-400 text-white',
    primary: 'bg-blue-400 text-white',
    inverse: 'bg-white text-gray-600 border',
    danger: 'bg-red-500 text-white'
}

type BadgeProps = React.ComponentPropsWithoutRef<'span'> & {
    label: string;
    type?: keyof typeof types
    onClose?: () => void
}

export const Badge = ({ label = "", type = "default", onClose, className, ...props }: BadgeProps) => {
    const mainClass = `font-medium rounded inline-flex items-center me-3 ${types[type]} ${className}`;
    const textClass = "py-1 px-3 text-xs";
    const closeClass = "inline-flex items-center h-full w-hull cursor-pointer px-2";
    return (
        <span className={mainClass}>
            <span className={textClass}>{label}{props.children}</span>
            {onClose &&
                <span
                    className={closeClass}
                    onClick={() => onClose && onClose()}>
                    x
                </span>
            }
        </span>
    )
}