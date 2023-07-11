import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({data, setClick, collectId, CoWorkers}) => {
  const navigate = useNavigate()
  if(data.employee?.role === 'worker'){
    data.department = data.worker?.department
    data.name = data.employee.name
  }
  return (
    <div className={`mt-10 ml-3 w-[90%] md:mx-auto md:w-1/5 md:min-w-1/4 ${collectId?.includes(data._id) ? 'bg-slate-300' : 'bg-white'} text-center border rounded-lg shadow-lg cursor-pointer`} onClick={() =>{
          if(data.employee.role === 'worker' && !CoWorkers){
            console.log('1')
            navigate(`/co-workers/${data.employee._id}`)
          } else if (CoWorkers) {
            console.log('object')
            navigate(`/profile/${data.coWorkers[0]._id}`)
          } else {
            console.log('2')
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
      <p className="text-xl font-bold pt-4 px-20">{CoWorkers? data.coWorkers[0].name : data.name ?? data[0]?.name}</p>
      <p className="text-md font-medium pb-5">{CoWorkers? data.coWorkers[0]?.department : data.department ?? data[0]?.department}</p>
    </div>
  );
};

export default Card;
