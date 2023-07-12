import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { instance } from "../insatnce";

const AddSubManager = ({ isOpen, onClose }) => {
    const [stores, setStores] = useState([])
    const [employee, setEmployee] = useState([])
    useEffect(() => {
      axios.get(`${instance}/api/get-all-stores`)
      .then((res) => {
        setStores(res.data)
      })

      axios.get(`${instance}/api/get-employee`)
      .then((res) => {
        setEmployee(res.data)
      })
    }, [])
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
            const newOne = employee.filter((employer) => employer._id === data.empId)
            data.name = newOne[0].name
            axios.post(`${instance}/api/add-sub-manager`, data)
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
        <div className="bg-pink-100 w-[95%] md:w-2/3 lg:w-1/3  rounded-lg shadow-lg p-4">
          <div className="flex justify-end">
            <button
              className="text-xl font-semibold mr-4"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div className="text-center">
            <p className="py-10 text-xl font-bold">New Sub Manager</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-left px-8 pb-10 "
            >
              <label htmlFor="name" className="w-[80%] font-medium">
                NAME
                <span className="font-normal">
                <select
                    className={`w-full mt-3 border h-10 rounded-lg pl-2 text-lg ${
                      !errors.empId && "mb-5"
                    }`}
                    {...register("empId", {
                      required: true,
                    })}
                  >
                    <option value="">Select One</option>
                    {
                      employee.length !== 0 && employee.map((employer) => (
                        <option value={employer._id} key={employer._id}>{employer.name}</option>
                      ))
                    }
                  </select>
                  {errors.empId && (
                    <p className="text-red-600 mb-5">
                      {errors.empId.type === "required" &&
                        "This field is required"}
                    </p>
                  )}
                </span>
              </label>
              <label htmlFor="store" className="w-full mb-4 font-medium">
                STORE
                <span className="font-normal">
                  <select
                    className={`w-full mt-3 border h-10 rounded-lg pl-2 text-lg ${
                      !errors.storeId && "mb-5"
                    }`}
                    {...register("storeId", {
                      required: true,
                    })}
                  >
                    <option value="">Select One</option>
                    {
                      stores.length !== 0 && stores.map((store) => (
                        <option key={store._id} value={store._id}>{store.name}</option>
                      ))
                    }
                  </select>
                  {errors.storeId && (
                    <p className="text-red-600 mb-5">
                      {errors.storeId.type === "required" &&
                        "This field is required"}
                    </p>
                  )}
                </span>
              </label>
              <label htmlFor="store name" className="w-[80%] font-medium">
                DEPARTMENT
                <span className="font-normal">
                  <input
                    className={`w-full mt-3 border h-10 rounded-lg pl-2 text-lg ${
                      !errors.department && "mb-5"
                    }`}
                    type="text"
                    {...register("department", {
                      required: true,
                    })}
                  />
                  {errors.department && (
                    <p className="text-red-600 mb-5">
                      {errors.department.type === "required" &&
                        "This field is required"}
                    </p>
                  )}
                </span>
              </label>
              <div className="flex justify-end">
                <button
                  className="px-4 py-3 border hover:bg-pink-300 bg-pink-200 hover:text-white rounded-lg font-medium text-sm"
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

export default AddSubManager;
