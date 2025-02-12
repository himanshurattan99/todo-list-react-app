const Button = ({ onClick, disabled = false, variant = 'primary', children, className = '' }) => {
    const baseStyle = "py-1 px-3 rounded-md cursor-pointer"
    const variants = {
        primary: "bg-violet-500 hover:bg-violet-700 text-slate-100",
        secondary: "bg-slate-300 hover:bg-slate-500 text-slate-700 hover:text-slate-100",
        filter: "bg-violet-300 text-violet-800",
        filterActive: "bg-violet-700 text-slate-100"
    }

    return (
        <button onClick={onClick} disabled={disabled} type="button" className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    )
}

export default Button