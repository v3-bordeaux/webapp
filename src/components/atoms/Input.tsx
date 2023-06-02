import {InputHTMLAttributes} from "react";

type InputProps = {} & InputHTMLAttributes<HTMLInputElement>;

export function Input(
    {
        className = '',
        type = 'text',
        ...props
    }: InputProps
) {
    return (
        <input
            type={type}
            className={`rounded-full bg-background-1 text-text-1 border-2 border-text-4 py-2 px-4 ${className}`}
            {...props}
        ></input>
    )
}