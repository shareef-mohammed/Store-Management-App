import React from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../insatnce";
import axios from "axios";

const Card = ({ data, setClick, collectId, CoWorkers, refresh }) => {
  const navigate = useNavigate();
  if (data.employee?.role === "worker") {
    data.department = data.worker?.department;
    data.name = data.employee.name;
  }

  const deleteCoWorker = async (id) => {
    axios.post(`${instance}/api/delete-co-worker/${id}`, {asstId: data._id})
    .then((res) => {
      console.log(res.data)
      refresh()
    })
    .catch((err) => {
      console.log(err)
    })
  }
  // console.log(data.coWorkers[0]._id)
  return (
    <div
      className={`mt-10 ml-3 w-[90%] md:mx-auto md:w-1/5 md:min-w-1/4 ${
        collectId?.includes(data._id) ? "bg-slate-300" : "bg-white"
      } text-center border rounded-lg shadow-lg cursor-pointer`}
     
    >
      {CoWorkers && (
       <div className="flex justify-end m-4">
         <p className="text-red-600 cursor-pointer " onClick={() => deleteCoWorker(data.coWorkers[0]._id)}>
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
      )}
      <div  onClick={() => {
        if (data.employee.role === "worker" && !CoWorkers) {
          console.log("1");
          navigate(`/co-workers/${data.employee._id}`);
        } else if (CoWorkers) {
          console.log("object");
          navigate(`/profile/${data.coWorkers[0]._id}`);
        } else {
          console.log("2");
          setClick(data);
        }
      }}>
      <img
        className="mx-auto border-b p-3"
        width={300}
        height={300}
        src={
          CoWorkers
            ? data.coWorkers[0].profilePic
            : data.employee?.profilePic ??
              data.profilePic ??
              data[0]?.employee?.profilePic
        }
        alt=""
      />
      <p className="text-xl font-bold pt-4 px-20">
        {CoWorkers ? data.coWorkers[0].name : data.name ?? data[0]?.name}
      </p>
      <p className="text-md font-medium pb-5">
        {CoWorkers
          ? data.coWorkers[0]?.department
          : data.department ?? data[0]?.department}
      </p>
      </div>
    </div>
  );
};

export default Card;
