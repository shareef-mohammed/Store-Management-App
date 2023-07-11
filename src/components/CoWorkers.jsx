import axios from "axios";
import React, { useEffect, useState } from "react";
import { instance } from "../insatnce";
import { useParams } from "react-router-dom";
import Card from "./Card";

const CoWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${instance}/api/get-co-workers/${id}`)
      .then((res) => {
        setWorkers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full pb-10">
      <div className="w-full">
        {
        // workers.length !== 0 &&
        //   workers.map((data) => 
          <Card data={workers} />
        //   )
          }
      </div>
      <div className="block md:flex overflow-scroll scrollbar-hide w-full">
        {
            workers.map((data, index) => (
                <Card key={index} data={data} CoWorkers={true} />
            ))
        }
      </div>
    </div>
  );
};

export default CoWorkers;
