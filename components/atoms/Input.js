export function Input({className, ...props}) {
    return (
        <input
            className={`rounded-md p-2 border border-slate-200 ${className ?? ''}`}
            {...props}
        ></input>
    )
}