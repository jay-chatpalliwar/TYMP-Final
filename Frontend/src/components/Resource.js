import React, { useEffect, useState } from 'react'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import Sideb from '../components/Sideb'
import Resourcecard from '../components/Resourcecard'
import Facultyresourcecard from '../components/Facultyresourcecard'
import toast from 'react-hot-toast';
const BASE_URL = process.env.BASE_URL;

const email = localStorage.getItem('email');


const Resource = () => {


function getFileIconUrl(fileType) {
  switch (fileType) {
    case "application/pdf":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/267px-PDF_file_icon.svg.png";
    case "application/msword": // Word file type
      return "https://play-lh.googleusercontent.com/9kABykeGovHPy-dN19lRxxnCp8IZK3Pkl8qLFNxrEe-hhKVZeiyhTBEIRUt6t-vhxQ=w240-h480-rw"; // Provide the path to your Word icon image
    case "image/png": // PNG file type
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwcuk9hprSThl39fXyt7pNoeya2Dm5hE9OygVuz-4&s"; // Provide the path to your PNG icon image
    case "image/jpeg": // JPEG file type
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu8hSHwEA7_tRX9-OQzugc5pr_aV3wF_vLv6UXVrq1&s"; // Provide the path to your JPEG icon image
    case "text/plain": // TXT file type
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt6RzahLm5gLNlEJ9POBZykazdiDkjfwJBjwmnSdoS9A&s"; // Provide the path to your TXT icon image
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation": // PPTX file type
      return "https://upload.wikimedia.org/wikipedia/commons/3/3b/Microsoft_PowerPoint_Logo.png";
    case "application/vnd.ms-powerpoint": // PPT file type
      return "https://upload.wikimedia.org/wikipedia/commons/3/3b/Microsoft_PowerPoint_Logo.png";
    default:
      return "https://static.vecteezy.com/system/resources/previews/005/242/931/original/file-computer-folder-icon-isolated-on-white-background-free-vector.jpg"; // Default icon or image for other file types
  }
}

const openFile = (fileUrl) => {
  window.open(fileUrl, "_blank");
};

 const [fileUploads, setFileUploads] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const filesListRef = ref(storage, "files/");

  const handleFileChange = (event) => {
    const files = event.target.files;
    setFileUploads([...files]);
  };

  const uploadFiles = () => {
    fileUploads.forEach((file) => {
      const fileRef = ref(storage, `files/${file.name}`);
      uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [
            ...prev,
            { url, name: file.name, type: file.type },
          ]);
        });
      });
    });
    toast.success('file uploaded')
  };


 const removeFile = (index) => {
    const fileToRemove = imageUrls[index];
    setImageUrls((prev) => prev.filter((file, i) => i !== index));
    // Delete the file from Firebase Storage
    const fileToDelete = ref(storage, `files/${fileToRemove.name}`);
    deleteObject(fileToDelete)
      .then(() => {
        console.log(`File ${fileToRemove.name} deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error deleting file: ${error.message}`);
      });
  };


 const em = localStorage.getItem('email');
const [name,setname] = useState('');
const token = localStorage.getItem('token');
const dummytags = ['DAA' , 'CD' , 'AI' , 'IOT' , 'IP','CN','DC','OS','DBMS']
const [role,setrole]= useState('');


    const getprofile = async (e) => {
    // login
 try{ 
   console.log("gp called")
    // const loadToast = toast.loading("Hang Up!");
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
       // toast.dismiss(loadToast)
      }, 1000);
      
      
      
      if(response.ok)
      { 
       
        console.log(data.user);
         setid(data.user._id);
        //  console.log("Chejdnfdknt'lkfhlkhgcnhfjlkynlk")
        //  console.log(data.user.role);
         setrole(data.user.role);
         setname(data.user.name);
        
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
  
  useEffect(()=>{getprofile()},[])
  

const [id,setid] = useState('');
const [resdata, setresdata] = useState([]);
const [datafaculty, setFaculty] = useState([]);
const [difficulty,setdifficulty] = useState('beginner');
const [imgurl,setimgurl]=useState('');
const [title,settitle] = useState('');
const [author,setauthor] = useState('');
const [tags,settags]= useState([]);
const [description,setdescription] =useState('')
const [links, setlinks] = useState([]);
const [li,setli] = useState('');
const [sem,setsem]=useState('');

const LinkHandler = (link)=>{  
  
   setlinks([...links,link])
  // console.log(links)
  setli('')
}

const handleTagChange = (e) => {
  const selectedTag = e.target.value;
  settags((prevTags) => {
    if (!prevTags.includes(selectedTag)) {
      return [...prevTags, selectedTag];
    }
    return prevTags; // Return the existing state if the tag is already in the array
  });
  console.log(tags);
};


const linkDeleter = (id)=>{
   console.log(id);
   const newlist = links.filter((link,index)=>{ return index !== id})
  // console.log(newlist)
  setlinks(newlist);
}
//useEffect(()=>{console.log(li)},[li])

const getResources = async()=>{

 try{
    const response = await fetch(`http://localhost:4000/fetchResources`, {
    method: 'POST', // HTTP request method
   headers: {
    'Content-Type': 'application/json', 
     
   },
    body: JSON.stringify({
      role: role,
      email:email
    })
    });
    const data = await response.json();
      console.log("DATA" + data);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    console.log("Inside published")
    console.log(data.resources);
     setFaculty(data.resources);
    
 } 
 catch(e)
 {  
   
    // console.error('Fetch error at resource fetch:', e);
    console.log("Failed for loading resources",e)
 }
}
const getAll = async()=>{

  try{
     const response = await fetch("http://localhost:4000/getAll", {
     method: 'GET', // HTTP request method
    headers: {
     'Content-Type': 'application/json', 
      
    },
 
     });
     const data = await response.json();
       console.log(data);
     
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     
      setresdata(data.resources);
     
  } 
  catch(e)
  {  
    
     console.error('Fetch error at resource fetch:', e);
  }
 }
 
 useEffect(()=>{getAll()},[]); //new
useEffect(()=>{getResources()},[]);
// const [files,setfiles] = useState([]);

// const uploadFiles = async () => {
//   const inputElement = document.getElementById('dropzone-file');
//   const formData = new FormData();
//   const load = toast.loading('Uploading files');

//   if (inputElement.files.length === 0) {
//     // Handle the case where no files are selected.
//     toast.error('No files selected');
//     toast.dismiss(load); // Dismiss the loading toast
//     return;
//   }

//   for (let i = 0; i < inputElement.files.length; i++) {
//     formData.append('files', inputElement.files[i]);
//   }

//   try {
//     const response = await fetch('http://localhost:4000/fileupload', {
//       method: 'POST',
//       body: formData,
//     });
//  const data = await response.json();
//  console.log(data);
//     if (response.ok) {
//      toast.success('files uploaded')
//       if (data.uploadedFiles) {
//         let temp = data.uploadedFiles.map((file) => file.fileURL);
//         setfiles(temp);
//       }
//       toast.dismiss(load); // Dismiss the loading toast
//     } else {
//       toast.error('File upload failed');
//       console.error('File upload failed');
//     }
//   } catch (error) {
//     toast.error('Error during file upload');
//     console.error('Error during file upload:', error);
//   }
// };


// document.addEventListener('DOMContentLoaded', function () {

// });
// Add an event listener to call the uploadFiles function when the input changes



const postResource = async () => {
  try {
    console.log({
      links,
      difficulty,
      description,
      title,
      tags,
      name,
      sem,
      imageUrls,
    });

    const filelinks = imageUrls.map((imageUrl) => imageUrl.url);
    const reslinks = links.map((link) => link);
  //console.log(links);
    const response = await fetch(`http://localhost:4000/createResource`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    
      body: JSON.stringify({
        id: id,
        token: token,
        
        links: links,
        difficulty: difficulty,
        desc: description,
        files: filelinks,
        semester: sem,
        title: title,
        tags: tags,
        author: name,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success('Resource uploaded successfully');
    }
    console.log(data);
  } catch (e) {
    console.log('error while posting resource: ' + e);
  }
};

const dummyData = [
{ 
  title : 'Operating system module 1',
  i:'https://img.freepik.com/free-photo/public-examination-preparation-concept_23-2149369870.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1698883200&semt=ais',
  desc:'By following these steps, you can handle click events on the buttons and define the logic you want to execute when a button is clicked.'
},
{ 
  title : 'IOT module 5',
  i:'https://img.freepik.com/premium-vector/iot-internet-things-devices-connectivity-concepts-network-flat-style-with-people_194782-1655.jpg',
  desc:'By following these steps, you can handle click events on the buttons and define the logic you want to execute when a button is clicked.'
},
{ 
  title : 'Operating systems module 2',
  i:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0hzZQ_ZgZQa09fQLKnrsL37fX0hgI3Z15g&usqp=CAU',
  desc:'By following these steps, you can handle click events on the buttons and define the logic you want to execute when a button is clicked.'
},
{ 
  title : 'This is title',
  i:'https://picsum.photos/seed/picsum/200/300',
  desc:'By following these steps, you can handle click events on the buttons and define the logic you want to execute when a button is clicked.'
},
{ 
  title : 'This is title',
  i:'https://picsum.photos/seed/picsum/200/300',
  desc:'By following these steps, you can handle click events on the buttons and define the logic you want to execute when a button is clicked.'
},
{ 
  title : 'This is title',
  i:'https://picsum.photos/seed/picsum/200/300',
  desc:'By following these steps, you can handle click events on the buttons and define the logic you want to execute when a button is clicked.'
}
]

//useEffect(()=>{getResources()},[]);

const [active,setactive] = useState(0);
const [ftab,setftab]=useState(2);

const handleInputChange = (event) => {
    setli(event.target.value); // Update the state with the input value
  };

const load = () =>{
  const toastload = toast.loading("Loading");

  // const filterBytag = useState();

  setTimeout(()=>{setftab(1)},3000);
  toast.dismiss(toastload);
}

  return (
    <div className='flex min-h-screen'>
     <Sideb></Sideb>
     <div className='p-2 px-5 flex flex-col'> 
     {
       role==="student" &&
        <div> 
        <div className=' w-[100%] text-xl mt-2 font-bold  mb-4'>YOUR RESOURCES</div>
        <div className='flex flex-wrap gap-2 mb-2'>
        {/* {
           dummytags.map((tag,ind)=>{return (
    <button
      className={`${
        active === ind ? "bg-blue-700 border-white" : "bg-blue-400"
      } text-white font-bold p-2 rounded-lg min-w-[50px]`}
      key={ind}
      onClick={() =>(setactive(ind))} // Add an onClick event here
    >
      {tag}
    </button>
  );})
         } */}
    </div>
        <div className='flex flex-col gap-3'>
         {/* {
           dummyData.map((resource,ind)=>{return <Resourcecard title={resource.title} i={resource.i} desc={resource.desc} key={ind} ></Resourcecard>})
          } */}
          {resdata && <div className='flex flex-col gap-3 lg:w-[60vw]'>
         {
           resdata.map((resource,ind)=>{return <Facultyresourcecard data={resource}
            key={ind} ></Facultyresourcecard>})
          }
        </div>
        }
         {
          !resdata && <div>No Resources found</div>
         }
        </div>
        </div>
     }
     
     
     {
      (role === "faculty"||role === "teacher") && 
      <div className=' md:w-[500px] lg:w-[1000px] '>
      
       <div>
      <div className='w-[100%] text-xl mt-2 font-bold  mb-4'>Your Resources</div>
      <div className='flex flex-wrap gap-3 bg-slate-800 items-center rounded-lg p-2 mb-5 w-full'>
      <button className={` ${ftab ===1 ?'bg-blue-800':'bg-transparent'} font-bold text-white p-2 rounded-lg`} onClick={()=>{getResources() ;load()}} >published</button>
      <button className={` ${ftab ===2 ?'bg-blue-800':'bg-transparent'} font-bold text-white p-2 rounded-lg`} onClick={()=> {setftab(2)}}>Create a new</button>      
      </div>
      </div>      
      </div>
     }
    
      {/**for list */}
     {
     ftab===1 && <div>
     {
     (role === "faculty"||role === "teacher") && 
       datafaculty.length!==0 ? <div className='flex flex-col gap-5'>
       {
        datafaculty.map((data,ind)=>{return <Facultyresourcecard key={ind} data={data}></Facultyresourcecard>})
       }
       </div> :<div>No Resources created yet</div>
     }
     </div>
     
       
      }
       {/**for resource form */}
     {
        role==="faculty"  && ftab===2 && 
        <div>
        {
         
         <div className='flex flex-col rounded-lg drop-shadow-xl gap-4  p-3'>
         <div className='flex gap-5 w-full '>
         <div className='uppercase font-bold'>Title</div>
         <input onChange={(e)=>{settitle(e.target.value)}} type='text' className='rounded-md outline-none w-full'></input>
         </div>
         <div className='flex gap-5 w-full flex-wrap justify-between'>
             <div className='uppercase font-bold'>Difficulty Rating</div>
              <div className='flex flex-wrap gap-3 bg-blue-100'>
              <div className={` rounded-lg px-1 cursor-pointer`} onClick={()=>{setdifficulty('beginner')}}>Beginner</div>
              <div onClick={()=>{setdifficulty('intermediate')}} className=' rounded-lg px-1 cursor-pointer'  >Intermediate</div>
              <div onClick={()=>{setdifficulty('advanced')}} className=' rounded-lg px-1 cursor-pointer' >Advanced</div>
              </div>
         </div>
         <div className='flex justify-between gap-3' >
         <div className='uppercase font-bold'>Add the description</div>
         <textarea onChange={(e)=>{setdescription(e.target.value)}} className='w-full'></textarea>
         </div>
         <div className='flex flex-wrap justify-between gap-3'>
          <div className='flex gap-5 flex-wrap justify-between items-center'>
         
         {/* <div className='uppercase font-bold'>Select Semester</div> */}
         {/* <select className='p-1 w-[100px]' onChange={(e) => setsem(e.target.value)}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, ind) => {
          return <option value={item} key={ind}>{item}</option>;
          })}
          </select> */}
          
          <div className='flex gap-5 flex-wrap justify-between items-center'>
  <div className='uppercase font-bold'>Select Semester</div>
  <select className='p-1 w-[100px]' onChange={(e) => setsem(e.target.value)}>
    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, ind) => {
      return <option value={item} key={ind}>{item}</option>;
    })}
  </select>
</div>  


         </div>
  
         <div className='flex gap-5 items-center flex-wrap justify-between'>
         <div className='uppercase font-bold' >Select tag</div>
        <select className='p-1 w-[100px]' onChange={handleTagChange}>
        {
          dummytags.map((item, ind) => {
             return <option value={item} key={ind}>{item}</option>;
           })
       }
       </select>
         </div>
         </div>
        
            <div className='font-bold uppercase'>Add the links to references</div>
            
         <div className='flex justify-between gap-3'>
          <input type='text' className='w-full indent-2' value={li}  onChange={handleInputChange}  ></input>
          <div className='bg-green-500 text-white font-bold p-2 px-4 rounded-md cursor-pointer' onClick={()=>LinkHandler(li)}>Add</div>
         </div>   
          {links.length!==0 && <div className='flex flex-col gap-2'>{
              links.map((elem,index)=>{return <div className='flex justify-between '><div key={index} >{elem} </div><div className=' text-white bg-red-600 rounded-md p-1 cursor-pointer' onClick={()=>{linkDeleter(index)}}>delete</div></div>})
          }</div>}
          
          <div className='font-bold uppercase'>Upload the files</div>
          {/* <input
        type="file"
        onChange={handleFileChange}
        multiple // Allow multiple file selection
      /> */}
      {imageUrls.length!==0 && <div className='font-bold flex justify-center'>Your uploaded files</div>}
      
    <div className='flex flex-wrap gap-2 justify-center items-center'>
    {imageUrls.map((file, index) => (
        <div key={index} title={file.name} className='flex flex-col items-center justify-items-end'>
           
            <div>
             <img
        src={getFileIconUrl(file.type)}
        alt={file.name}
        className="w-10 cursor-pointer"
        onClick={() => openFile(file.url)}
      />
              {file.name.substring(0,5)+"..."}
            </div>
          
          <button onClick={() => removeFile(index)} className='bg-red-600 text-white font-semibold rounded-md p-1 '>Remove</button>
        </div>
      ))}
    </div>
      
        <div className='fileupload flex flex-col items-center'> 
  <div className="flex items-center justify-center w-full">
    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-300">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
        </svg>
        <p className="mb-2 text-sm text-gray-900 dark:text-gray-490"><span className="font-semibold">Click to select files</span></p>
        <p className="text-xs text-gray-900 dark:text-gray-900">PNG, JPG, PDF, TXT, PPT ,PPTX or DOC</p>
      </div>
      <input id="dropzone-file" type="file" className="hidden" onChange={()=>{uploadFiles()}} multiple />
      <input
        id="dropzone-file"
        type="file"
        
        onChange={handleFileChange}
        multiple // Allow multiple file selection
      />
    </label>
  </div> 
</div>
            <button onClick={uploadFiles} className='bg-blue-600 text-white font-bold p-2 rounded-lg'>Upload Files</button>
          <button onClick={()=>{postResource()}} className='bg-green-600 translate-x-6 md:translate-x-36 lg:translate-x-96 font-bold text-white p-2 rounded-md w-[200px]'>Create</button>
         </div>
         
           
        }
        </div>
     }
     
     </div>
     
    </div>
  )
}

export default Resource