const InputGroup = ({
  classProps,
  labelText,
  icon,
  type,
  placeholder,
  inputClassProps,
  onChange,
  autofocus,
  valid = true,
  errorMessage,
}) => {
  return (
    <div className={classProps}>
      <label className="label">
        <span className="label-text">{labelText}</span>
        <span className="label-text text-error">{errorMessage}</span>
      </label>
      <label className="input-group justify-center">
        <span className="bg-neutral">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          className={`input  ${inputClassProps} ${valid ? "" : "border-error"}`}
          onChange={onChange}
          autoFocus={autofocus}
        />
      </label>
    </div>
  );
};

export default InputGroup;