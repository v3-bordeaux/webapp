import {InputHTMLAttributes} from "react";

type InputProps = {} & InputHTMLAttributes<HTMLInputElement>;

export function Input(
    {
        className,
        type = 'text',
        ...props
    }: InputProps
) {
    return (
        <input
            className={`rounded-md p-2 border border-slate-200 ${className}`}
            {...props}
        ></input>
    )
}