const OutlineButton = ({
    className,
    children,
    color,
    onClick,
}) => {
    return (<button
        type='button'
        className={`outline-button color-${color} ${className}`}
        onClick={onClick}
    >
        {children}
    </button>);
};
export default OutlineButton;
OutlineButton.defaultProps = {
    className: '',
    color: 'primary',
    onClick(_) { }
};