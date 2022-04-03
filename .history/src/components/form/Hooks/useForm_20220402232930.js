import React, { useCallback, useState, useEffect } from "react";

function useForm({ initialValues, validate }) {
  const [errors, setErrors] = useState(initialValues);
  const [values, setValues] = useState(initialValues);
  const [touched, setTouchedFields] = useState({});

  useEffect(() => {
    setErrors(validate(values));
  }, [validate, values]);

  function handleChange(event) {
    const fieldName = event.target.name;
    const { value } = event.target;
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
