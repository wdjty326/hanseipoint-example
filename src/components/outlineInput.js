const OutlineInput = ({
    type,
    className,
    defaultValue,
    placeholder,
    value,
    onInput,
}) => {
    return <div className={`outline-input ${className}`}>
        <input
            type={type}
            defaultValue={defaultValue}
            value={value}
            placeholder={placeholder}
            onInput={(e) => {
                e.preventDefault();
                onInput(e.target.value);
            }}
        />
    </div>
};
export default OutlineInput;
OutlineInput.defaultProps = {
    type: 'text',
    className: '',
    onInput(value) { },
};