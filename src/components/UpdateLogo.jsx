import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { instance } from "../insatnce";

const UpdateLogo = ({ isOpen, onClose, reload }) => {
  const [file, setFile] = useState();
  const [err, setErr] = useState()

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

  const editLogo = async() => {
    let data = {}
    if (file.name) {
      const postImage = await uploadImage(file);
      if (postImage == "err") {
        return setErr("Data adding failed");
      }
      data.logo = postImage;
    }
    axios
      .post(`${instance}/api/add-logo`, data)
      .then((res) => {
        reload()
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log('file')
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
            <p className="py-10 text-xl font-bold">New Logo</p>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <div className="flex justify-end">
                <button
                  className="px-4 py-3 border hover:bg-blue-300 bg-blue-200 hover:text-white rounded-lg font-medium text-sm"
                  onClick={editLogo}
                >
                  Create
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateLogo;
