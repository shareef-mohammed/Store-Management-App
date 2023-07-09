import React from "react";

const Card = ({data, id, setClick, setData, collectId}) => {

  if(data.employee.role === 'worker'){
    data.department = data.worker.department
    data.name = data.employee.name
  }
  return (
    <div className={`mt-10 w-1/5 min-w-1/4 mx-auto ${collectId.includes(data._id) ? 'bg-slate-300' : 'bg-white'} text-center border rounded-lg shadow-lg cursor-pointer`} onClick={() =>{
            setClick(data)
            
        }}>
      <img
        className="mx-auto border-b p-3"
        width={300}
        height={300}
        src={data.employee.profilePic}
        alt=""
      />
      <p className="text-xl font-bold pt-4">{data.name}</p>
      <p className="text-md font-medium pb-5">{data.department}</p>
    </div>
  );
};

export default Card;
