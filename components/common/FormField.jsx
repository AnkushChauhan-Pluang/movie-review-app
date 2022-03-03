import { TextField } from '@mui/material';
import { ErrorMessage, Field } from 'formik';

const FormField = (props) => {
  return (
    <div>
      <Field
        {...props}
        as={TextField}
        variant="outlined"
        size="small"
        className="w-full"
      />
      <ErrorMessage
        name={props.name}
        component="div"
        className="mt-1 rounded bg-red-100 px-2 py-1 text-xs text-red-500"
      />
    </div>
  );
};

export default FormField;
