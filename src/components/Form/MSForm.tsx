import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

const MSForm = ({ onSubmit, children, defaultValues }) => {
  const methods = useForm({ defaultValues });

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues]);

  const submit = (data) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)} className="p-5">
        {children}
      </form>
    </FormProvider>
  );
};

export default MSForm;
