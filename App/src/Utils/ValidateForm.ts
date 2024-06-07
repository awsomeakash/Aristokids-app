function validateFormData(formData: { [key: string]: any }) {
  let formValidator = true
  Object.keys(formData).forEach(key => {
    if (formData[key] === '') formValidator = false
  });
  if (!formValidator) console.warn('Please fill all the fields');
  return formValidator
}

export default validateFormData;
