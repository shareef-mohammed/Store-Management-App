import React, { useEffect, useState } from "react";
import Card from "./Card";
import { instance } from "../insatnce";
import axios from "axios";

const Home = () => {
  const [first, setFirst] = useState([]);
  const [manager, setManager] = useState([])
  const [second, setSecond] = useState([]);
  const [id, setId] = useState();
  const [collectId, setCollectId] = useState([]);
  const data = {id:1, type: 'manager'};
  const fir = [{id:2, type: 'sub manager'}, {id:3, type: 'sub manager'}];
  const sec = [{id:11, type: 'employee'}, {id:21, type: 'employee'}, {id:31, type: 'employee'}];
  useEffect(() => {
    axios.get(`${instance}/api/get-manager`)
    .then((res) => {
      res.data[0].department = 'STORE MANAGER'
      setManager(res.data)
    })

  },[])
  const setClick = (data) => {
    setId(data._id);
    if(collectId.includes(data._id)){
      setCollectId(collectId.slice(0, collectId.indexOf(data._id + 1)))
    } else {
      setCollectId([...collectId, data._id]);
    }
    if(data.employee.role === 'manager') {
      axios.get(`${instance}/api/get-sub-manager`)
      .then((res) => {
        setFirst(res.data)
        setSecond([])
      })
    }
    if(data.employee.role === 'submanager'){
      setFirst(first.filter((item) => item._id === data._id))
      axios.get(`${instance}/api/get-workers/${data._id}`)
      .then((res) => {

          setSecond(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  };
  return (
    <div className="w-full pb-10">
      <div className="flex justify-center mt-6">
        <p className="text-2xl font-bold border px-6 py-3 rounded-lg">ZARA DHM - 13861</p>
      </div>
      <div className="w-full">
        {manager.length !== 0 && manager.map((data) => (
          <Card data={data}  id={id} setClick={setClick} collectId={collectId} />
        ))}
      </div>
      <div className="w-full flex justify-between">
        {first.length !== 0 &&
          first.map((data) => (
            <Card
              key={data.id}
              data={data}
              id={id}
              setClick={setClick}
              collectId={collectId}
            />
          ))}
      </div>
      <div className="w-full flex justify-between">
        {second.length !== 0 &&
          second.map((data) => (
            <Card
              key={data.id}
              data={data}
              id={id}
              setClick={setClick}
              collectId={collectId}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
