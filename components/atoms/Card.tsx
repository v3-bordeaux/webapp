import {HTMLAttributes, ReactNode} from "react";

type CardProps = {
    children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function Card(
    {
        className,
        children,
        ...props
    }: CardProps
) {
    return (
        <section
            className={`flex flex-col p-8 bg-slate-100 rounded-2xl w-full max-w-lg mx-auto ${className}`} {...props}>
            {children}
        </section>
    );
}