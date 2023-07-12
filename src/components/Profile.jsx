import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../insatnce";
import EditProfile from "./EditProfile";
import EditFileName from "./EditFileName";
import DeleteConfirm from "./DeleteConfirm";

const Profile = () => {
  const [employee, setEmployee] = useState();
  const [file, setFile] = useState();
  const [fresh, setFresh] = useState(false);
  const [err, setErr] = useState("");
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false)
  const [iid, setIid] = useState()
  const [del, setDel] = useState(false)
  const [delId, setDelId] = useState()

  const { id } = useParams();
  const reload = () => {
    setFresh(!fresh)
  }

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);

  };
  const openModal1 = () => {
    setModal1(true);
  };

  const closeModal1 = () => {
    setModal1(false);
  }
  const openDelete = () => {
    setDel(true);
  };

  const closeDelete = () => {
    setDel(false);
  }
  useEffect(() => {
    axios
      .get(`${instance}/api/get-profiles/${id}`)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [modal, fresh]);

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
    axios
      .post(`${instance}/api/delete-file/${employee._id}`, { id })
      .then((res) => {
        setFresh(!fresh);
        closeDelete()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteId = (id) => {
    setDelId(id)
  }

  const fixId = (id) => {
    setIid(id)
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
        <DeleteConfirm isOpen={del} onClose={closeDelete} deleteFile={deleteFile} id={delId}  />
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
              <EditFileName isOpen={modal1} onClose={closeModal1} id={iid} employee={employee._id} reload={reload}/>
              <p className="px-2 text-green-600" onClick={() => {
                openModal1()
                fixId(file._id)
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </p>
              <p
                className="text-red-600 cursor-pointer "
                onClick={() => {
                  deleteId(file._id)
                  openDelete()
                }}
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
