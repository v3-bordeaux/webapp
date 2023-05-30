import {HTMLAttributes, ReactNode} from "react";

type H2Props = {
    children: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

export function H2(
    {
        className = '',
        children,
        ...props
    }: H2Props
) {
    return (
        <h2 className={`text-lg md:text-2xl ${className}`} {...props}>
            {children}
        </h2>
    );
}