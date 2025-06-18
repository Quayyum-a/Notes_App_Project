import React from 'react'

const ProfileInfo = ({onLogout}) => {
  return (
    <div className='flex items-center gap-2'>
      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-slate-950 ">TU</div>
      <div>
        <p className='text-sm font-medium'>Quayyum</p>
        <button className='' onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default ProfileInfo