import {HTMLAttributes, ReactNode} from "react";

type H1Props = {
    children: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

export function H1(
    {
        className = '',
        children,
        ...props
    }: H1Props
) {
    return (
        <h1 className={`text-xl md:text-3xl ${className}`} {...props}>
            {children}
        </h1>
    );
}