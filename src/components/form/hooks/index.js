import { useEffect, useState } from "react";

function useForm({ initialValues, validate }) {
  const [errors, setErrors] = useState(initialValues);
  const [values, setValues] = useState(initialValues);
  useEffect(() => {
    setErrors(validate(values));
  }, [values]);
  const [touched, setTouchedFields] = useState({});

  function handleChange(event) {
    const fieldName = event.target.name;
    const value = event.target.value;
    setValues({
      ...values,
      [fieldName]: value,
    });
  }

  function handleBlur(event) {
    const fieldName = event.target.name;
    setTouchedFields({
      ...touched,
      [fieldName]: true,
    });
  }

  return {
    values,
    errors,
    touched,
    handleBlur,
    setErrors,
    handleChange,
  };
}

export { useForm };
