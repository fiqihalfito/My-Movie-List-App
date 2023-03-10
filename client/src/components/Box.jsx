const Box = ({ children }) => {
    return (
        <div className="w-1/2 p-4 bg-white rounded-md border-b-4 border-b-amber-500">
            {children}
        </div>
    )
}

export default Box