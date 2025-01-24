// import { useForm } from 'react-hook-form';

// const useCustomForm = (defaultValues) => {
//     const methods = useForm({ defaultValues });

//     const parseValues = (values) => {
//         const parsedValues = { ...values };
//         for (const key in parsedValues) {
//             if (typeof parsedValues[key] === 'string') {
//                 // Example parsing logic; adjust as needed
//                 if (!isNaN(parsedValues[key])) {
//                     parsedValues[key] = Number(parsedValues[key]);
//                 } else if (parsedValues[key].toLowerCase() === 'true' || parsedValues[key].toLowerCase() === 'false') {
//                     parsedValues[key] = parsedValues[key].toLowerCase() === 'true';
//                 } else if (Date.parse(parsedValues[key])) {
//                     parsedValues[key] = new Date(parsedValues[key]);
//                 }
//             }
//         }
//         return parsedValues;
//     };

//     const handleSubmit = (onValid) => {
//         return methods.handleSubmit((values) => onValid(parseValues(values)));
//     };

//     return { ...methods, handleSubmit };
// };

// export default useCustomForm;

import { useForm } from "react-hook-form"

const useCustomForm = (defaultValues) => {
  const methods = useForm({ defaultValues })

  const handleSubmit = (onValid) => {
    return methods.handleSubmit(onValid)
  }

  return { ...methods, handleSubmit }
}

export default useCustomForm
