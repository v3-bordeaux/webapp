import React, {ButtonHTMLAttributes, ReactNode} from "react";

type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(
    {
        className = '',
        children,
        type = 'button',
        ...props
    }: ButtonProps
) {
    return (
        <button
            type={type}
            className={`rounded-full bg-cta-1 text-text-1 border-2 border-current shadow-brut active:shadow-none py-2 px-4 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}