import React, { useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { BASE_URL } from '../utils/constants';
import {useDispatch, useSelector} from "react-redux";
import { addConnections } from '../utils/connectionSlice';
const Connections = () => {
const dispatch=useDispatch();
const userConnections=useSelector((store)=>store.connections)
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connections",
        { withCredentials: true }
      );
      
      // console.log(res);
      // console.log(res.data["connections are"]);
      dispatch(addConnections(res?.data["connections are"]));
    } catch (err) {
      // TODO: handle error case
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []); // Dependency array ensures this runs only once

  return userConnections && (
    <div className="p-5">
        <h1 className="text-3xl font-bold text-center mb-6">Connections</h1>
        {userConnections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {userConnections.map((connection) => (
                    <div key={connection._id} className="card bg-blue-100 shadow-lg">
                        <figure className="px-10 pt-10">
                            <img
                                src={connection.photoUrl}
                                alt={`${connection.firstName} ${connection.lastName}`}
                                className="rounded-full w-24 h-24 object-cover"
                            />
                        </figure>
                        <div className="card-body text-center">
                            <h2 className="card-title">{`${connection.firstName} ${connection.lastName}`}</h2>
                            <p className="text-gray-600">{connection.about}</p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-500 mb-10">No connections available</p>
        )}
    </div>
);


};

export default Connections;
