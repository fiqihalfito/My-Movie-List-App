const AddIcon = (props) => (
    <svg
        width={'2rem'}
        height={'2rem'}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M9 12h6M12 9v6"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M3 12c0-7.412 1.588-9 9-9s9 1.588 9 9-1.588 9-9 9-9-1.588-9-9Z"
            stroke="white"
            strokeWidth={2}
        />
    </svg>
)

export default AddIcon