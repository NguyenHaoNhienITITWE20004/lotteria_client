import React from 'react';

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-black bg-opacity-70 fixed inset-0 z-50'>
      <div className='flex flex-col items-center space-y-4'>
        <div role='status' className='flex justify-center items-center'>
          <svg
            aria-hidden='true'
            className='w-16 h-16 text-blue-400 animate-spin'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              cx='50'
              cy='50'
              r='45'
              stroke='currentColor'
              strokeWidth='10'
              strokeDasharray='283'
              strokeDashoffset='75'
              strokeLinecap='round'
              className='animate-spin-slow'
            />
          </svg>
        </div>
        <p className='text-xl text-gray-50 font-semibold'>Please wait..</p>
      </div>
    </div>
  );
};

export default Loading;
