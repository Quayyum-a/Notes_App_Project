import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-slate-950 font-medium text-lg bg-slate-100">
        {getInitials(userInfo?.fullName)}
      </div>
      <div>
        <p className="text-sm font-medium">{userInfo?.fullName}</p>
        {userInfo && (
          <button
            className="text-sm text-slate-500 underline"
            onClick={onLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
