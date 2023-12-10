import {useLocation} from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import Calendar from 'moedim';
import {LuBookOpenCheck} from 'react-icons/lu'
import {SiGoogleclassroom} from 'react-icons/si'
import Piechart from "./Piechart";
import Loader from "./loader"
import {FaAccessibleIcon, FaRegClock} from 'react-icons/fa'
import {LiaUserFriendsSolid} from 'react-icons/lia'
import Chart from "react-apexcharts";
import {useEffect, useState} from 'react';
import { get } from 'mongoose';

 export default function Dashboard(props) {
    const location = useLocation();
    const [subjects,useSubjects] = useState(["CD","DAA","AI","IOT","IP"]);
    const [chartval,setChart] = useState({options: {
        chart: {
          id: "PieChart"
        },
        xaxis: {
          categories: subjects
        }
      },
      series: [
        {
          name: "Marks of MSE",
          data: [24, 25, 20, 27, 28]
        },
        {
          name: "Marks of ESE",
          data: [30, 40, 45, 46, 48]
        },
      ]});
    // console.log(location)
    const [currclass,setCurrclass] = useState("Sem 5 CSE")
    const [mass,setMass] = useState({data:[]});
    const [total,setTotal] = useState([]);
    const [indi,setIndi] = useState([]);
    const [loading,setLoading] = useState(true);
    // const data = useSelector((state) => state.name.name);
    // console.log("name is ",data);
    // const name = data.payload || "Jay Chatpalliwar"
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    // let token = localStorage.getItem("token");

    // if(token === null || token === undefined)

    const getData = async (e) => {
        // login
     try{ 
    //    console.log("student data in mass called")
        //  const loadToast = toast.loading("Hang Up!");
          const response = await fetch(`http://localhost:4000/getData`,{
           method:'GET',
           headers:{
             'Content-type': 'application/json; charset=UTF-8'       }
          })
          
          const data = await response.json();

        //   console.log(data);
        //   SiAdobelightroomclassic(data);
            setMass(data);

            setTimeout(() => {
                calculateTotalSum(mass);

            },5000)
        }
        catch(e){
            console.log(e)
        }
    }

    const calculateTotalSum = (mass) => {

        let temp = [];
        let a,b,c,d,e;
        a = b = c = d = e = 0;
        // console.log(mass);
        for(let i = 0;i<mass.data.length;i++){
            // console.log(mass.data[i]);
            if(mass.data[i].email === email){
                let temp1 = [mass.data[i].CD,mass.data[i].DAA,mass.data[i].AI,mass.data[i].IOT,mass.data[i].IP]
                setIndi(temp1);
                console.log(indi);
            }
            a+=mass.data[i].CD;
            b+=mass.data[i].DAA;
            c+=mass.data[i].AI;
            d+=mass.data[i].IOT;
            e+=mass.data[i].IP;
        }

        temp = [a/20,b/20,c/20,d/20,e/20];

        // console.log("Printing temp");
        // console.log(temp);
        setTotal(temp);
        // console.log("Printing total");
        // console.log(total);

        setChart(
            {options: {
                chart: {
                  id: "PieChart"
                },
                xaxis: {
                  categories: subjects
                }
              },
              series: [
                {
                  name: "Average Marks",
                  data: total
                },
                {
                  name: `Your Marks`,
                  data: indi
                },
              ]}
        )
    }

    const [role,setrole] = useState("");
    const em = localStorage.getItem("email");
    const token = localStorage.getItem("token")

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
         
          // console.log(data.user);
          //  setid(data.user._id);
          //  console.log("Chejdnfdknt'lkfhlkhgcnhfjlkynlk")
          //  console.log(data.user.role);
           setrole(data.user.role);
          //  setname(data.user.name);
          
        }
        else
        {
        // setTimeout(()=>{toast.error(data.message)},1000);
        
        }
      }
      catch(e)
      {
        console.log("error at profile fetch - "+e);
      }
    };

    useEffect(() =>{
         getData();
         getprofile();
         setTimeout(() =>{
            setLoading(false);

         },8000);
        // console.log(first)

        // setTimeout(() =>{
        //     calculateTotalSum(mass);
        // },5000)
    },[mass])
        
    return (
        <div className='relative'>
          {role === "faculty" &&
          <div className='flex mx-auto px-10 py-10 my-auto justify-center items-center text-3xl text-teal-600'>Welcome {name} to Faculty Dashboard.</div>

          }
            {loading === true && role === "student" &&
            // <Loader className=' px-96'/>
            <div
  className="w-64 ml-[480px] h-screen aspect-square rounded-full flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]"
>
  <span
    class="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"
  >
  </span>
</div>

            }
            {loading === false && role == "student" &&

        <div className="container mx-auto ml-8 mt-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold  text-left">Welcome,{name}</h1>
            <p className="text-lg text-right">Class : Sem 5</p>
          </div>
          <div className='flex justify-between items-center m-8'>
          <Chart
              options={chartval.options}
              series={chartval.series}
              type="bar"
              width="500"
              />
          <Chart
              options={chartval.options}
              series={chartval.series}
              type="radar"
              width="500"
              />
          </div>
          <div className="flex justify-center space-x-8 items-center">
            <div className="p-4 border rounded-md shadow-md w-[200px] text-center">
              <h2 className="text-lg font-semibold mb-2">Doubt Forum</h2>
              <a href="/doubtforum" className="text-blue-500 hover:underline block">Visit Doubt Forum</a>
            </div>
            <div className="p-4 border rounded-md shadow-md w-[200px] text-center">
              <h2 className="text-lg font-semibold mb-2">Resources</h2>
              <a href="/resources" className="text-blue-500 hover:underline block">View Resources</a>
            </div>
            <div className="p-4 border rounded-md shadow-md w-[200px] text-center">
              <h2 className="text-lg font-semibold mb-2">Blogs</h2>
              <a href="/blogs" className="text-blue-500 hover:underline block">Read Blogs</a>
            </div>
          </div>
        </div>
        }
              </div>
      );
}