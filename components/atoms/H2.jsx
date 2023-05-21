export function H2({className, children}) {
    return (
        <h2 className={`text-2xl mb-2 ${className ?? ''}`}>
            {children}
        </h2>
    );
}