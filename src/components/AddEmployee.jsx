import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { instance } from "../insatnce";

const AddEmployee = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  const uploadImage = async (logo) => {
    try {
      const formData = new FormData();
      formData.append("file", logo);
      formData.append("upload_preset", "zcenmmpy");
      formData.append("cloud_name", "dqd1le2ao");
  
      const response = await fetch("https://api.cloudinary.com/v1_1/dqd1le2ao/image/upload", {
        method: "POST",
        body: formData,
      });
  
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

      if (selectedFile?.name) {
        const postImage = await uploadImage(selectedFile);
        if (postImage == "err") {
          return setErr("Data adding failed");
        }
        data.profilePic = postImage
      }
      axios.post(`${instance}/api/add-employee`, data)
      .then((res) => {
        onClose()
      })
      .catch((err) => {
        console.log(err)
      })
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
        <div className="bg-green-100 rounded-lg shadow-lg p-4 w-[95%] md:w-2/3 lg:w-1/3 h-screen overflow-scroll">
          <div className="flex justify-end">
            <button className="text-xl font-semibold mr-4" onClick={onClose}>
              X
            </button>
          </div>
          <div className="text-center">
            <p className="py-10 text-xl font-bold">New Employee</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-left px-8 pb-10 "
            >
              <label htmlFor="name" className="w-[80%] font-medium">
                NAME
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
              <label htmlFor="empId" className="w-full mb-4 font-medium">
                EMPLOYEE ID
                <span className="font-normal">
                  <input
                    className={`w-full mt-3 border h-10 rounded-lg pl-2 text-lg ${
                      !errors.employeeId && "mb-5"
                    }`}
                    type="text"
                    {...register("employeeId", {
                      required: true,
                    })}
                  />
                  {errors.employeeId && (
                    <p className="text-red-600 mb-5">
                      {errors.employeeId.type === "required" &&
                        "This field is required"}
                    </p>
                  )}
                </span>
              </label>
              <div className="col-span-2 md:col-span-1 md:pr-8">
            <label className="block font-medium">Profile Picture</label>
            <div
              {...getRootProps()}
              className={`dropzone mb-4 h-42 ${isDragActive ? "active" : ""}`}
            >
              <input
                {...getInputProps()}
                className='w-56 md:w-96 h-8 border-[#d1d5db] border rounded pl-3 dark:bg-meta-4 dark:text-white'
                accept="image/jpeg,image/png,image/jpg"
              />
              {selectedFile?.name ? (
                <div className="flex flex-col justify-center items-center w-56 md:w-96 h-50 overflow-hidden rounded">
                  <img
                    width={300}
                    height={100}
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected"
                  />
                </div>
              ) : selectedFile ? (
                <div className="flex flex-col justify-center items-center min-w-full h-50 overflow-hidden border-[#D1D5DB] border rounded">
                  <img
                    width={300}
                    height={100}
                    src={selectedFile}
                    alt="Selected"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center min-w-full h-50 border-[#D1D5DB] border rounded">
                  <p>Drag and drop an image here, or</p>
                  <p>Click to browse for a file</p>
                </div>
              )}
            </div>
          </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-3 border hover:bg-green-300 bg-green-200 hover:text-white rounded-lg font-medium text-sm"
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

export default AddEmployee;
