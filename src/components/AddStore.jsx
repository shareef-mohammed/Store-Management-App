import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { instance } from "../insatnce";

const AddManager = ({ isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data, e) => {
        const isValid = await trigger();
        if (!isValid) {
          e.preventDefault();
          return;
        } else {
            axios.post(`${instance}/api/add-store`, data) 
            .then((res) => {
                onClose()
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50 "></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-yellow-100 rounded-lg shadow-lg p-4 w-[95%] md:w-2/3 lg:w-1/3">
          <div className="flex justify-end">
            <button
              className="text-xl font-semibold mr-4"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div className="text-center">
            <p className="py-10 text-xl font-bold">New Store</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-left px-8 pb-10 "
            >
              <label htmlFor="store name" className="w-[80%] font-medium">
                STORE NAME
                <span className="font-normal">
                  <input
                    className={`w-full mt-3 border h-10 rounded-lg pl-2 text-lg ${
                      !errors.name && "mb-5"
                    }`}
                    type="text"
                    {...register("name", {
                      required: true,
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-600 mb-5">
                      {errors.name.type === "required" &&
                        "This field is required"}
                    </p>
                  )}
                </span>
              </label>
              <label htmlFor="store" className="w-full mb-4 font-medium">
                STORE ID
                <span className="font-normal">
                <input
                    className={`w-full mt-3 border h-10 rounded-lg pl-2 text-lg ${
                      !errors.storeId && "mb-5"
                    }`}
                    type="text"
                    {...register("storeId", {
                      required: true,
                    })}
                  />
                  {errors.storeId && (
                    <p className="text-red-600 mb-5">
                      {errors.storeId.type === "required" &&
                        "This field is required"}
                    </p>
                  )}
                </span>
              </label>
              <div className="flex justify-end">
                <button
                  className="px-4 py-3 border hover:bg-yellow-300 bg-yellow-200 hover:text-white rounded-lg font-medium text-sm"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddManager;
