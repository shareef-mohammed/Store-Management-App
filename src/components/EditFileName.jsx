import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { instance } from "../insatnce";

const EditFileName = ({ isOpen, onClose, reload, employee, id}) => {
  const [file, setFile] = useState();
  const [err, setErr] = useState()
  const editLogo = async() => {
    let data = {}
    if(!file) {
        setErr('This field is required')
    }
    data.fileId = id
    data.fileName = file
    axios
      .post(`${instance}/api/edit-file-name/${employee}`, data)
      .then((res) => {
        reload()
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
            <p className="py-5 text-xl font-bold">New Logo</p>
            <label htmlFor="">Enter your new file name</label>
            <input type="text" className="pl-2 w-[90%] border h-8 mb-4 rounded" onChange={(e) => setFile(e.target.value)} />
            {err && <p className="text-red-600">{err}</p>}
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

export default EditFileName;
