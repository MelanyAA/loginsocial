import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [ValuesForm, setValuesForm] = useState(initialState);

  //Para limpiar la caja de texto input
  // const reset = () => {
  //   setValuesForm(initialState);
  // };
  //*
  const reset = (newFormState = initialState) => {
    setValuesForm(newFormState);
  };


const handleInputChange = ({ target }) => {
  setValuesForm({
    ...ValuesForm,
    [target.name]: target.value,
  });
};
return [ValuesForm, handleInputChange, reset];
};