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
      <div className="block md:grid grid-cols-4 gap-4">
        {
            workers.map((data) => (
                <Card key={data._id} data={data} CoWorkers={true} />
            ))
        }
      </div>
    </div>
  );
};

export default CoWorkers;
