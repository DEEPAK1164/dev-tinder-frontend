import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
const EditProfile = ({ user }) => {
  const [firstName, setFirstname] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    //clear the error before saving the profile.
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 space-y-10">
      {" "}
      {/* Main container */}
      <div className="flex justify-center items-start mb-10 space-x-10">
        {/* Edit Profile Form Card */}
        <div className="card bg-neutral text-base-content text-white w-96 shadow-lg">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            <div>
              {/* Form Controls */}
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text text-white">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs bg-primary"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text text-white">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs bg-primary"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text text-white">Photo URL</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full max-w-xs bg-primary"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text text-white">Age</span>
                </div>
                <input
                  type="number"
                  value={age}
                  className="input input-bordered w-full max-w-xs bg-primary"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text text-white">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full max-w-xs bg-primary"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text text-white">About</span>
                </div>
                <textarea
                  value={about}
                  className="textarea textarea-bordered w-full max-w-xs bg-primary"
                  onChange={(e) => setAbout(e.target.value)}
                  rows="3"
                ></textarea>
              </label>
            </div>

            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center m-2">
              <button className="btn" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* User Profile Card Display */}
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
