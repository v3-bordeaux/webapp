import React, {ButtonHTMLAttributes, ReactNode} from "react";

type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(
    {
        className,
        children,
        type = 'button',
        ...props
    }: ButtonProps
) {
    return (
        <button
            type={type}
            className={`rounded-md bg-slate-600 text-white p-2 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}