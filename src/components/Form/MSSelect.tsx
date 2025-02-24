import React from "react";
import { useFormContext } from "react-hook-form";


const MSSelect = ({name,label,items,defaultFieldValue}) => {
    const {register}=useFormContext()
    return (
        <div className="form-control ">
        {/* <label className="label">
          <span className="label-text">{label}</span>
        </label> */}

        <select
          className="select input input-bordered w-full capitalize"
          {...register(name)}
          defaultValue={defaultFieldValue}
        >
          <option disabled >
            ---Select One---
          </option>
          {items?.map((item: any,idx) => {
            return (
              <option key={idx} value={item?.name}>
                {item?.name}
              </option>
            );
          })}
        </select>
      </div>
    );
};

export default MSSelect;