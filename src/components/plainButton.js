const PlainButton = ({
    className,
    children,
    onClick,
}) => {
    return (<button
        type='button'
        className={`plain-button ${className}`}
        onClick={onClick}
    >
        {children}
    </button>);
};
export default PlainButton;
PlainButton.defaultProps = {
    className: '',
    onClick(_) { }
};