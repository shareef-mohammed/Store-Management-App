import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({data, setClick, collectId, CoWorkers}) => {
  const navigate = useNavigate()
  if(data.employee?.role === 'worker'){
    data.department = data.worker?.department
    data.name = data.employee.name
  }
  console.log(data)
  return (
    <div className={`mt-10 w-[90%] ${CoWorkers ? 'w-full' : 'w-[90% ]'} md:mx-auto md:w-1/5 md:min-w-1/4 mx-auto ${collectId?.includes(data._id) ? 'bg-slate-300' : 'bg-white'} text-center border rounded-lg shadow-lg cursor-pointer`} onClick={() =>{
          if(data.employee.role === 'worker'){
            navigate(`/co-workers/${data.employee._id}`)
          } else {
            setClick(data)
          }                       
        }}>
      <img
        className="mx-auto border-b p-3"
        width={300}
        height={300}
        src={CoWorkers? data.coWorkers[0].profilePic : data.employee?.profilePic ?? data.profilePic ?? data[0]?.employee?.profilePic}
        alt=""
      />
      <p className="text-xl font-bold pt-4">{CoWorkers? data.coWorkers[0].name : data.name ?? data[0]?.name}</p>
      <p className="text-md font-medium pb-5">{CoWorkers? data.coWorkers[0]?.department : data.department ?? data[0]?.department}</p>
    </div>
  );
};

export default Card;
