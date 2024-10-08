import { useField, FormikProps } from "formik";
import Input from "@mui/joy/Input";

const CustomInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <label className="block uppercase text-gray-500 text-xs font-bold mb-2">
        {label}
      </label>
      <div>
        <Input
          {...field}
          {...props}
          variant="outlined"
          color={meta.touched && meta.error ? "danger" : "neutral"}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="text-sm ml-1 mt-1" style={{ color: "red" }}>
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export default CustomInput;
