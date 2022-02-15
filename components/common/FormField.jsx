import { ErrorMessage, Field } from 'formik';

const FormField = (props) => {
  return (
    <div>
      <Field
        {...props}
        className="w-full rounded border p-2 text-sm placeholder:text-sm"
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
