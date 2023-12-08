import React from 'react';

const Resourcepage = ({data,setlist}) => {

  //  const title = "Compiler design";
  // const desc = "this is compiler design module"
  // const author = "Nitin gavankar"
  // const difficulty = "medium"
  // const sem = 5
  // const tags = ['CD']
  // const files =[{name:'mod1',link:'www.google.com'},{name:'mod2',link:'www.google.com'},{name:'mod3',link:'www.google.com'}]
  // console.log("file data =" + data.files);
  // console.log(data);
  if(data === undefined || data === null)
    return
  
  return (
    <div className="flex flex-col  items-center justify-center  shadow-lg p-2">
    <div className='flex flex-col w-[500px] md:w-[600px] gap-3'>
    
     <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="mt-2">{data.desc}</p>
      <div className="mt-4">
        <p className=''><span className='font-bold'>Author</span>: {data.author}</p>
        <p className=''><span className='font-bold'>Difficulty</span>: {data.difficulty}</p>
        <p className=''><span className='font-bold'>Semester</span>: {data.semester}</p>
      </div>
     
      <div className="mt-4">
        <p className='font-bold'>Tags:</p>
        <ul className="list-disc ml-6">
          {data.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
      { 
       data.files &&
       <div>
       <p className='font-bold'>Resource Files:</p>
        <ul className="list-disc ml-6">
          {data.files.map((file, index) => (
            <li key={index}>
             <a href={file} target="_blank" rel="noopener noreferrer">
  {file.substring(0,60)+"..."}
</a>
            </li>
          ))}
        </ul>
       </div>
      }
       { 
       data.files && !Array.isArray(data.files) &&
       <div>
       <p className='font-bold'>Resource Files:</p>
        <ul className="list-disc ml-6">
         
            <li>
             <a href={data.files.link} target="_blank" rel="noopener noreferrer">
  {"hello" + data.files.substring(0,100)}
</a>
            </li>
         
        </ul>
       </div>
      }
        
      </div>
     <div className='bg-blue-600 text-white font-bold cursor-pointer flex rounded-md justify-center' onClick={()=>{ setlist(true)}}> close </div>
    </div>
     
    </div>
  );
};

export default Resourcepage;
