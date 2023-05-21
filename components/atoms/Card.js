export function Card({className, children}) {
    return (
        <section className={`flex flex-col p-8 bg-slate-100 rounded-2xl w-full max-w-lg mx-auto ${className}`}>
            {children}
        </section>
    );
}