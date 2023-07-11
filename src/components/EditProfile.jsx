import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { instance } from "../insatnce";

const EditProfile = ({ isOpen, onClose, employee }) => {
  const [file, setFile] = useState();
  console.log(employee);
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();

  useState(() => {
    addName();
  }, []);
  function addName() {
    setValue("name", employee?.name);
  }

  const uploadImage = async (logo) => {
    try {
      const formData = new FormData();
      formData.append("file", logo);
      formData.append("upload_preset", "zcenmmpy");
      formData.append("cloud_name", "dqd1le2ao");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqd1le2ao/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const postImage = data.secure_url;
        return postImage;
      } else {
        return "err";
      }
    } catch (err) {
      return "err";
    }
  };

  const onSubmit = async (data, e) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
      return;
    } else {
      if (file.name) {
        const postImage = await uploadImage(file);
        if (postImage == "err") {
          return setErr("Data adding failed");
        }
        data.profilePic = postImage;
      }
      axios
        .post(`${instance}/api/edit-employee/${employee._id}`, data)
        .then((res) => {
          onClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50 "></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-blue-100 w-[95%] md:w-2/3 lg:w-1/3  rounded-lg shadow-lg p-4">
          <div className="flex justify-end">
            <button className="text-xl font-semibold mr-4" onClick={onClose}>
              X
            </button>
          </div>
          <div className="text-center">
            <p className="py-10 text-xl font-bold">New Manager</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-left px-8 pb-10 "
            >
              <label htmlFor="name" className="w-[80%] font-medium">
                NAME
                <span className="font-normal">
                  <input
                    type="text"
                    className={`w-full mt-3 border h-10 rounded-lg pl-2 text-lg ${
                      !errors.name && "mb-5"
                    }`}
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
              <label htmlFor="name" className="w-[80%] font-medium">
                Change profile picture
                <span className="font-normal">
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    className={`w-full mt-3 border h-10 rounded-lg pl-2 text-lg `}
                  />
                </span>
              </label>
              <div className="flex justify-end">
                <button
                  className="px-4 py-3 border hover:bg-blue-300 bg-blue-200 hover:text-white rounded-lg font-medium text-sm"
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

export default EditProfile;
