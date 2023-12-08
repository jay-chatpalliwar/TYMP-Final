import React from 'react'

const Resourcecard = ({title,i,desc}) => {
  return (
    <div className='flex gap-4 p-3 rounded-lg shadow-lg '>
    <div>
    <img src={i} className='w-[50px] h-[50px]' alt='thumbnail'></img>
    </div>
    <div className='flex flex-col gap-2'> 
    <div className='font-bold'>{title}</div>
    <div className='hidden md:block'>{desc.substring(0,100)}</div>
    </div>
    </div>
  )
}

export default Resourcecard