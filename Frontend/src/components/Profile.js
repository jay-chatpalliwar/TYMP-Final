import React, { useEffect, useState } from 'react'
import Sideb from '../components/Sideb'
import { Delete, EditIcon, SaveIcon } from 'lucide-react';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
 const [view,setview] = useState(1);
 const [user,setuser]=useState({})
   const [currentpassword,setCurrentpassword]=useState('')
    const [newpassword,setNewpassword]=useState('')
     const [confirmpassword,setConfirmpassword]=useState('')
     
     const handleCurrentPasswordChange = (event) => {
    setCurrentpassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewpassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmpassword(event.target.value);
  };
  const navigate = useNavigate();
     
   const em = localStorage.getItem('email');
   const token = localStorage.getItem('token');
   console.log("Data taken from token.")
   console.log(token)
   console.log(em)
   
    const getprofile = async (e) => {
    // login
 try{ 
   console.log("gp called")
     const loadToast = toast.loading("Hang Up!");
      const response = await fetch(`http://localhost:4000/getProfile`,{
       method:'POST',
       body:JSON.stringify({
         email:em,
         token:token
       }),
       headers:{
         'Content-type': 'application/json; charset=UTF-8'       }
      })
      
      const data = await response.json();
     
     
      setTimeout(() => {
        toast.dismiss(loadToast)
      }, 1000);
      
      
      
      if(response.ok)
      { 
       
        console.log(data.user)
         setuser(data.user)
         setrole(data.user.role)
         setSemester(data.user.current_sem);
        
      }
      else
      {
      setTimeout(()=>{toast.error(data.message)},1000);
      
      }
    }
    catch(e)
    {
      console.log("error at profile fetch - "+e);
    }
  };
  
  
   const deleteprofile = async () => {
    // login
 try{ 
   console.log("dp called")
     const loadToast = toast.loading("Hang Up!");
      const response = await fetch(`http://localhost:4000/deleteProfile`,{
       method:'POST',
       body:JSON.stringify({
         email:em,
         token:token
       }),
       headers:{
         'Content-type': 'application/json; charset=UTF-8'       }
      })
      
      const data = await response.json();
      console.log(data)
     
      setTimeout(() => {
        toast.dismiss(loadToast)
      }, 1000);
      
      
      if(response.ok)
      { 
        navigate('/');
      }
      else
      {
      setTimeout(()=>{toast.error(data.message)},1000);
      
      }
    }
    catch(e)
    {
      console.log("error at profile fetch - "+e);
    }
  };
  
  
    const updateprofile = async (e) => {
    // login
 try{ 
   console.log("up called")
     const loadToast = toast.loading("Hang Up!");
      const response = await fetch(`http://localhost:4000/updateProfile`,{
       method:'POST',
       body:JSON.stringify({
         email:em,
         token:token,
         name,
         gender,
         mobile,
         branch,
         specialization,
         year,
         sem:semester,
         department
       }),
       headers:{
         'Content-type': 'application/json; charset=UTF-8'       }
      })
      
      const data = await response.json();
     
     
      setTimeout(() => {
        toast.dismiss(loadToast)
      }, 1000);
      
      
      if(response.ok)
      { 
        console.log(data)
         setuser(data.profile)
         
         setTimeout(() => {
          const uptoast=  toast.loading('Updating your profile , please wait...');
          toast.dismiss(uptoast);          
         }, 3000);
         toast.success('updation successful')
         setview(1);
      }
      else
      {
      setTimeout(()=>{toast.error(data.message)},1000);
      
      }
    }
    catch(e)
    {
      console.log("error at profile update- "+e);
    }
  };
  
  
  const changePass = async () => {
    // login
 try{ 
   console.log("ps called")
     const loadToast = toast.loading("Hang Up!");
      const response = await fetch(`http://localhost:4000/change-password`,{
       method:'POST',
       body:JSON.stringify({
         email:em,
         token:token,
         currentpassword:currentpassword,
         confirmpassword:  confirmpassword,
          newpassword:  newpassword
         
       }),
       headers:{
         'Content-type': 'application/json; charset=UTF-8'       }
      })
      
      const data = await response.json();
     
     
      setTimeout(() => {
        toast.dismiss(loadToast)
      }, 1000);
      
      
      if(response.ok)
      { 
       toast.success('password changed successfully')
        
      }
      else
      {
      setTimeout(()=>{toast.error(data.message)},1000);
      
      }
    }
    catch(e)
    {
      console.log("error at password change - "+e);
    }
  };

  useEffect(()=>{getprofile()},[])
    // const [user,setuser] = useState({name:'John Doe',email:'johndoe@gmail.com',branch:'computer science',year:3,Mobile:1234567890,Gender:'Male' , semester:'Third'})
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [mobile, setMobile] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [pic, setPic] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [role,setrole]=useState('')
 useEffect(() => {

  if (user.email !== undefined) {

    setEmail(user.email);
  }
  if(user.role !==undefined)
  {
  setrole(role);
  }
  if (user.name !== undefined) {

    setName(user.name);
  }
   console.log(user.role)
  if (user.branch !== undefined) {
    setBranch(user.branch);
  }
  if (user.mobile !== undefined) {
    setMobile(user.mobile);
  }
  if (user.year !== undefined) {
    setYear(user.year);
  }
  if (user.gender !== undefined) {
    setGender(user.gender);
  }
  if (user.specialization !== undefined) {
    setSpecialization(user.specialization);
  }
  if (user.department !== undefined) {
    setDepartment(user.department);
  }
  if (user.current_sem !== undefined) {
    setSemester(user.current_sem);
  }
  if (user.image !== undefined) {
    setPic(user.image);
  }
   if (user.role !== undefined) {
    setPic(user.role);
  }
}, [user]);
  

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePicChange = (event) => {
    setPic(event.target.value);
  };

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

    

  return (
    <div className='flex min-h-screen'>
     <Sideb></Sideb>
     <div className='w-full'> 
     
     {/**view 1  - my profile*/}
     
     {
      view === 1 && 
      <div className=' p-4  flex flex-col gap-4 lg:w-9/12'>
      <div className='text-2xl font-bold text-gray-900'>My Profile</div>
  
      <div className='flex flex-wrap items-center bg-slate-50  rounded-md  p-3 justify-center shadow-2xl md:justify-between'>
          <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`} alt='userimage'  className='w-28 h-28 rounded-full'></img>
          <div className='flex flex-col gap-3 sm:justify-center lg:translate-x-32'>
           <div className='font-semibold text-xl'>{user?.name}</div>
           <div>{user?.email}</div>
           {/* {role ==="student" && <div>PRN : {123456} </div>}
           {role ==="faculty" && <div>Faculty ID : {123456} </div>}
           {role ==="admin" && <div>Admin ID : {123456} </div>} */}
            <div  onClick={()=>{setview(2)}}  className='flex gap-2 text-whitep-2 text-center items-center justify-center font-semibold rounded-md cursor-pointer text-white p-1 bg-blue-700' >Edit <EditIcon></EditIcon></div>
          </div>  
      <div>
      </div>
      
      </div>
      <div className='flex flex-col gap-3  bg-slate-50 shadow-2xl p-3  rounded-md'>
      <div className='flex flex-wrap justify-between  rounded-md p-2 gap-2'>
      <div className='font-bold text-xl'>Personal Details</div>
      <div  onClick={()=>{setview(2)}}  className='flex gap-2 text-white px-5 bg-blue-700 rounded-md font-semibold cursor-pointer items-center p-1'>Edit <EditIcon></EditIcon></div>
      </div>
      
      
  <div className='flex flex-wrap justify-between px-5 md:px-12 '>
      
      {/**col1 */} 
     <div className='flex flex-col gap-2'>
     
          <div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Name</div>
          <div className='font-bold text-gray-700'>{user?.name}</div>
          </div>
     
          <div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Email</div>
          <div className='font-bold text-gray-700'>{user?.email}</div>
          </div>
     
          <div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Mobile</div>
          <div className='font-bold text-gray-700'>{user.mobile?<>{user.mobile}</> :<>---</>}</div>
          </div>
          
          <div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Gender</div>
          <div className='font-bold text-gray-700'>{user.gender?<>{user.gender}</> :<>---</>}</div>
          </div>
     </div>
     {/**col2 */} 
    <div className='flex flex-col gap-2'>
    {
      <div> 

          {role==="student"?<div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Branch</div>
          <div className='font-bold text-gray-700'>{user.branch?<>{user.branch}</> :<>---</>}</div>
          </div>:<></>}
          
          {role==="faculty" ||role==="teacher" ?<div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Department</div>
          <div className='font-bold text-gray-700'>{user.branch?<>{branch}</> :<>---</>}</div>
          </div> : <></>} 
     
          {role==="student" ?<div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Semester</div>
          {console.log("sem"+semester)}
          <div className='font-bold text-gray-700'>{semester?<>{semester}</> :<>---</>}</div>
          </div>:<></> }
     
          {role==="student" ?<div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Academic year</div>
          <div className='font-bold text-gray-700'>{
          <>
  
          {user.year===1 && <div className='font-bold text-gray-700'>FIRST YEAR</div>}
          {user.year===2 && <div className='font-bold text-gray-700'>SECOND YEAR</div>}
         {user.year===3 && <div className='font-bold text-gray-700'>THIRD YEAR</div>}
          {user.year===4 && <div className='font-bold text-gray-700'>FOURTH YEAR</div>}
          </>
          
          
          }</div>
          </div> : <></>} 
          
          {role==="faculty" ||role==="teacher"  ?<div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Specialization</div>
          <div className='font-bold text-gray-700'>{specialization}</div>
          </div> : <></>} 
      </div>
    }
     
         
     
     </div>
     
 </div>
</div>
     
    <div className='flex flex-col gap-3  pl-2  bg-slate-50  rounded-md  p-3  shadow-2xl '>
    
    <div className='text-xl font-bold'>Change Password</div>
    <div className='flex flex-col gap-2'>
    <div className='pl-2 font-semibold'>Current Password</div>
    <input type='text ' value={currentpassword} onChange={handleCurrentPasswordChange} className='indent-2' placeholder=' Current Password'></input>
    </div>
    
    <div className='flex flex-col gap-2'>
    <div className='pl-2 font-semibold'>New Password</div>
    <input type='text ' value={newpassword} onChange={handleNewPasswordChange} className='indent-2' placeholder=' New Password'></input>
    </div>
    
    <div className='flex flex-col gap-2'>
    <div className='pl-2 font-semibold'>Confirm Password</div>
    <input type='text ' value={confirmpassword} onChange={handleConfirmPasswordChange} className='indent-2' placeholder=' Retype Password'></input>
    </div>
    
    <div className='flex gap-2 text-white text-center w-[200px] lg:w-[300px] place-self-center justify-center bg-blue-700 rounded-md font-semibold cursor-pointer items-center p-1' onClick={()=>{changePass()}}>Save Changes <SaveIcon></SaveIcon></div>
    
    
    
    </div> 
      
       <div className='flex flex-col gap-3  pl-2  bg-slate-50  rounded-md  p-3  shadow-2xl'>
    
    <div className='text-xl font-bold' >Delete Profile</div>
    <div className='text-gray-800'>
    Please note that if you choose to delete your own profile, your account would no longer exist. You would lose access to the resources provided.
    </div>
    
   
    
    <div  onClick={()=>{deleteprofile()}} className='flex gap-2 text-white text-center w-[200px] lg:w-[300px] place-self-center justify-center bg-blue-700 rounded-md font-semibold cursor-pointer items-center p-1'>Delete profile <Delete></Delete></div>
    
    
    
    </div> 
      
      </div>
     }
    
    {/**profile updation modal */}
    {
    
     view===2 && <>
    
     {
      
      <div className='flex flex-col items-center justify-center min-h-screen gap-10 lg:gap-30 bg-slate-100'>
       
       <div className='font-bold text-xl text-gray-900 pl-4'>Update your profile</div>
      <img
       src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
       alt="avatar" className='w-16' onClick={()=>{}} />
       <div>
       
         <div className='flex flex-wrap justify-around  gap-20 px-5 md:px-12 '>
      
      {/**col1 */} 
     <div className='flex flex-col gap-2'>
     
          <div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Name</div>
          <input type='text'  className='font-bold text-gray-700' onChange={handleNameChange} value={name} ></input>
         
          </div>
     
          <div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Email</div>
          <input type='text'  className='font-bold text-gray-700' onChange={handleEmailChange} value={email} d></input>
          </div>
     
          <div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Mobile</div>
         <input type='text'  className='font-bold text-gray-700' onChange={handleMobileChange} value={mobile} ></input>
          </div>
          
          <div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Gender</div>
          <input type='text'  className='font-bold text-gray-700' onChange={handleGenderChange} value={gender} ></input>
          </div>
     </div>
     {/**col2 */} 
    <div className='flex flex-col gap-2'>
    {
      <div>
          {(role==="student"||role==="faculty")?<div className=' flex flex-col gap-1'>
          {role==="student" && <div className='font-bold text-lg'>Branch</div>}
          {(role==="faculty" || role==="teacher") && <div className='font-bold text-lg'>Department</div>}
          <input type='text'  className='font-bold text-gray-700' onChange={handleBranchChange} value={branch} ></input>
          </div>:<></>}
          
          {/* {role==="faculty" ?<div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Department</div> 
          <input type='text'  className='font-bold text-gray-700' onChange={handleDepartmentChange} value={department} ></input>
          </div> : <></>}  */}
     
          {role==="student" ? <div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Semester</div>
          <input type='text'  className='font-bold text-gray-700' onChange={handleSemesterChange} value={semester} ></input>
          </div> : <></>}
     
          {role==="student" ?<div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Academic year</div>
          <input type='text' placeholder='specify a number 1-4'  className='font-bold text-gray-700' onChange={handleYearChange} value={year}></input>
          </div> : <></>} 
          
          {role==="faculty" ?<div className=' flex flex-col gap-1'>
          <div className='font-bold text-lg'>Specialization</div>
          <input type='text'  className='font-bold text-gray-700' onChange={handleSpecializationChange} value={specialization}></input>
          </div> : <></>} 
          
          
      </div>
    }
     
         
     
     </div>
     
 </div>
       
       </div>
       
        <div className='bg-blue-600 text-white font-bold cursor-pointer p-2 rounded-md text-center w-[200px] '  onClick={()=>{updateprofile();}} >Save Changes</div>
       
      </div>
      
       
     }
     
    </>
    
    
    }
   
    
     </div>
    </div>
  )
}

export default Profile