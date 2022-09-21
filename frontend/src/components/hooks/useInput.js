import { useState } from "react";

// A hook that is used on the modal email subscription to validate user info
const useInput = (validateValue) => {
  const [entredValue, setEntredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(entredValue);
  const hasError = !valueIsValid && isTouched;

  // function that handle what the user enter in input field
  const valueChangeHandler = (event) => {
    setEntredValue(event.target.value);
  };

  // function that handle if the input is touched
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  // function that handle input reset
  const reset = () => {
    setEntredValue("");
    setIsTouched(false);
  };

  return {
    value: entredValue,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
