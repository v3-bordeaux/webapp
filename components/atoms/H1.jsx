export function H1({className='', children}) {
    return (
        <h1 className={`text-4xl mb-4 ${className}`}>
            {children}
        </h1>
    );
}