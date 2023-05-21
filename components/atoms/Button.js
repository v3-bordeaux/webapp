export function Button({className, children, type, ...props}) {
    return (
        <button
            type={type ?? 'button'}
            className={`rounded-md bg-slate-600 text-white p-2 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}