const FormInput = ({
  label,
  error,
  registration,
  ...props
}) => {
  return (
    <div>
      <label>{label}</label>

      <input
        {...registration}
        {...props}
      />

      {error && (
        <p>{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;