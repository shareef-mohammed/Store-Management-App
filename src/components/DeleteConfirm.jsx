import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { instance } from "../insatnce";

const DeleteConfirm = ({ isOpen, onClose, reload, deleteFile, id}) => {
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
            <p className="py-5 text-xl font-bold">Delete Confirmation</p>
            <label htmlFor="">Do you want delete this..?</label>
              <div className="flex justify-end mt-3">
            
                <button className="px-4 py-3 border hover:bg-blue-300 bg-white hover:text-white rounded-lg font-medium text-sm mr-3" onClick={onClose}>Cancel</button>
                <button
                  className="px-4 py-3 border hover:bg-red-700 bg-red-500 text-white rounded-lg font-medium text-sm"
                  onClick={() => {
                    console.log('object')
                    deleteFile(id)
                    reload()
                    onClose()
                  }}
                >
                  Delete
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
