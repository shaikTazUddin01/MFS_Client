import React from "react"
import { useFormContext } from "react-hook-form";

const MSInput = ({ label, name, type, defaultFieldValue }) => {
  const { register, formState: { errors } } = useFormContext();

return (
  <div className="form-control">
    {/* <label className="label">
      <span className="label-text">{label}</span>
    </label> */}
    <input
      type={type}
      placeholder={`${label}`}
      className="input input-bordered"
      {...register(name, { required: true })}
      defaultValue={defaultFieldValue}
    />
    {errors[name] && (
      <span className="text-red-500 text-sm">This field is required</span>
    )}
  </div>
);

};

export default MSInput;
