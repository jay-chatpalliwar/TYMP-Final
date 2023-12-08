import { EditIcon, Facebook, ViewIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Resourcepage from './Resourcepage';


const Facultyresourcecard = ({data}) => {

const [list,setlist] = useState(true);
console.log(data)


 const navigate = useNavigate();
  return (
    <div>
    {
    <div className='flex gap-4 p-3 rounded-lg shadow-lg items-center justify-between flex-wrap'>
    <div>
    <img src="https://img.freepik.com/free-photo/public-examination-preparation-concept_23-2149369870.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1698883200&semt=ais" className='w-[50px] h-[50px]' alt='thumbnail'></img>
    </div>
    <div className='flex flex-col gap-2'> 
    <div className='font-bold '>{data?.title}</div>
    </div>
    <div className='flex gap-3'>
    {/* <button title='edit' onClick={console.log(data)}><EditIcon></EditIcon></button> */}
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