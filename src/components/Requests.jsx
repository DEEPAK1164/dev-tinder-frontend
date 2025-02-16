import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice';
import axios from 'axios';

const Requests = () => {
const dispatch=useDispatch(); 

const reviewRequest=async(status, _id)=>{
  try{
   const res=axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
   //_id passed is payload
   dispatch(removeRequest(_id));
  }catch(err){
    console.error("Error while accepting/rejecting:", err);
  }
}

const userRequests=useSelector((store)=>store.requests);


const fetchRequests=async()=>{
    try{
const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true})
console.log(res);
dispatch(addRequests(res.data.data));



    }catch(err){
      console.error("Error fetching requests:", err);
    }
}

useEffect(()=>{
fetchRequests();
},[])

return userRequests && (
  <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Requests</h1>
      {userRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {userRequests.map((request) => (
                  <div key={request.fromUserId._id} className="card bg-green-100 shadow-lg">
                      <figure className="px-10 pt-10">
                          <img
                              src={request.fromUserId.photoUrl}
                              alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                              className="rounded-full w-24 h-24 object-cover"
                          />
                      </figure>
                      <div className="card-body text-center flex flex-col items-center">
                       <h2 className="card-title text-center">{`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}</h2>
                        <p className="text-gray-600 text-center">{request.fromUserId.about}</p>
                     </div>

                      <div className='flex justify-center mb-5'>
                         
                      <button className="btn btn-primary mx-2 " onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
                      <button className="btn btn-secondary mx-2"  onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>

                      </div>

                  </div>
              ))}
          </div>
      ) : (
          <p className="text-center text-gray-500 mb-10">No requests available</p>
      )}
  </div>
);

}

export default Requests
