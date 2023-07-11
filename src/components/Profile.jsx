import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../insatnce";
import EditProfile from "./EditProfile";

const Profile = () => {
  const [employee, setEmployee] = useState();
  const [file, setFile] = useState();
  const [fresh, setFresh] = useState(false);
  const [err, setErr] = useState("");
  const [modal, setModal] = useState(false);

  const { id } = useParams();

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  useEffect(() => {
    axios
      .get(`${instance}/api/get-profiles/${id}`)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [modal, modal]);

  const uploadImage = async (file) => {
    try {
      console.log("object");
      const formData = new FormData();
      formData.append("file", file);
      //   formData.append("resource_type", "auto");
      //   formData.append("filename_override", file.name);
      //   const bufferToDataUrl = (buffer, type) => {
      //     return `data:${type};base64,${buffer.toString("base64")}`;
      //   };
      //   const dataUrl = bufferToDataUrl(file, file.type);
      //   console.log(dataUrl)
      //   formData.append("file", dataUrl);
      formData.append("upload_preset", "zcenmmpy");
      formData.append("cloud_name", "dqd1le2ao");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqd1le2ao/raw/upload",
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
  const uploadFile = async (e) => {
    let data = {};
    if (file?.name) {
      data.fileName = file.name;
      const postImage = await uploadImage(file);
      console.log(postImage);
      if (postImage == "err") {
        return setErr("Data adding failed");
      }
      data.url = postImage;
    }
    console.log(data);
    if (!file) {
      e.preventDefault();
      return;
    }
    axios
      .patch(`${instance}/api/edit-profile/${id}`, data)
      .then((res) => {
        console.log(res.data);
        setFresh(!fresh);
        setFile(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFile = (id) => {
    axios.post(`${instance}/api/delete-file/${employee._id}`,{id} )
    .then((res) => {
      setFresh(!fresh)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="text-center">
        <img
          className="mx-auto"
          width={300}
          height={300}
          src={employee?.profilePic}
          alt=" Profile Picture"
        />
        <p className="font-semibold text-lg py-4">{employee?.name}</p>
        <button className="px-3 py-2 border rounded mb-5" onClick={openModal}>
          Edit Profile
        </button>
        <EditProfile isOpen={modal} onClose={closeModal} employee={employee} />
        <div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            name=""
            id=""
          />
          <button className="rounded px-3 py-1 border" onClick={uploadFile}>
            Upload
          </button>
          {err && <p className="text-red-600">{err}</p>}
        </div>

        {employee?.files &&
          employee?.files.map((file, index) => (
            <div className="flex my-3 items-center">
              <a
                className="w-full ml-3 underline text-blue-600"
                key={index}
                href={file.url}
              >
                {file.fileName}
              </a>
              <p
                className="text-red-600 cursor-pointer "
                onClick={() => deleteFile(file._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
