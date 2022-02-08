import { Field } from 'formik'

const FormField = (props) => {
  return (
    <Field
      {...props}
      className="w-full rounded border p-2 text-sm placeholder:text-sm"
    />
  )
}

export default FormField
