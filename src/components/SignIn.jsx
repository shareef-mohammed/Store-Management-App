import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [err, setErr] = useState();
  const credential = {
    email: "zarastore@gmail.com",
    password: "123456",
  };
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data, e) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
      return;
    } else {
        console.log(data)
      if (
        data.email === credential.email &&
        data.password === credential.password
      ) {
        localStorage.setItem("og", data.email);
        navigate("/admin");
      } else {
        setErr("invalid input");
      }
    }
  };
  return (
    <div className="w-[95%] md:w-2/3 lg:w-1/3 mx-auto mt-12 md:mt-28 lg:mt-32  text-center border rounded-xl shadow-xl">
      <p className="py-10 text-xl font-bold">SIGNIN</p>
      <form onSubmit={handleSubmit(onSubmit)} className="text-left px-8 pb-10 ">
        <label htmlFor="email" className="w-[80%] font-medium">
          EMAIL
          <span className="font-normal">
            <input
              className={`w-full mt-3 border h-10 rounded-lg pl-2 text-lg ${
                !errors.email && "mb-5"
              }`}
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && (
              <p className="text-red-600 mb-5">
                {errors.email.type === "required" && "This field is required"}
              </p>
            )}
          </span>
        </label>
        <label htmlFor="password" className="w-full mb-4 font-medium">
          PASSWORD
          <span className="font-normal">
            <input
              className={`w-full mt-3 border h-10 rounded-lg pl-2 text-lg ${
                !errors.password && "mb-5"
              }`}
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-red-600 mb-5">
                {errors.password.type === "required" &&
                  "This field is required"}
              </p>
            )}
          </span>
        </label>
        {err && <p className="text-red-600">{err}</p>}
        <div className="flex justify-end">
          <button
            className="px-4 py-3 border hover:bg-green-500 hover:text-white rounded-lg font-medium text-sm"
            type="submit"
          >
            SIGNIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
