import React from 'react';

function Nav (){
    return <div className='font-monomaniac font-bold w-full flex justify-evenly'>
        <button className='text-3xl bg-blue border border-white px-7 py-4 rounded-xl text-white hover:bg-pink-500 transition-colors duration-300'>New Session</button>
        <button className='text-3xl bg-blue border border-white px-14 py-3 rounded-xl text-white hover:bg-pink-500 transition-colors duration-300'>History</button>
    </div>
}

export default Nav
