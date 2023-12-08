import { EditIcon, Facebook, ViewIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Resourcepage from './Resourcepage';


const Facultyresourcecard = ({data}) => {

const [list,setlist] = useState(true);

 const navigate = useNavigate();

 if(data === null)
    return ;
  return (
    <div>
    {
    <div className='flex gap-4 p-3 rounded-lg shadow-lg items-center justify-between flex-wrap'>
    <div>
    <img src="https://www.shutterstock.com/image-vector/3d-book-letter-gs-logo-600w-1425267173.jpg" className='w-[50px] h-[50px]' alt='thumbnail'></img>
    </div>
    <div className='flex flex-col gap-2'> 
    <div className='font-bold '>{data?.title}</div>
    </div>
    <div className='flex gap-3'>
  
    <button title='view' onClick={()=>{setlist(false)}}><ViewIcon></ViewIcon></button>
    </div>
    
    </div>
    }{/* title, desc, difficulty, files, sem, tags, author */}
    {
     !list && <div>
     <Resourcepage data={data} setlist={setlist} ></Resourcepage>
     </div>
    }
    
    </div>
  )
}

export default Facultyresourcecard