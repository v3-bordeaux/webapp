export function Button({className = '', children, type = 'button', ...props}) {
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