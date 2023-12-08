import {useLocation} from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import Calendar from 'moedim';
import {LuBookOpenCheck} from 'react-icons/lu'
import {SiGoogleclassroom} from 'react-icons/si'
import Piechart from "./Piechart";
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
                  name: "Marks of Student",
                  data: total
                },
                {
                  name: "Average Marks",
                  data: indi
                },
              ]}
        )
    }

    useEffect(() =>{
         getData();
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
            {loading === true &&
            <div className='flex absolute justify-center left-0 right-0 bg-black'>Loading</div>
            }
            {loading === false &&

        <div className="container mx-auto ml-8 mt-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-lg">Sem 5</p>
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
          <div className="flex justify-center space-x-8">
            <div className="p-4 border rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">Doubt Forum</h2>
              <a href="/doubtforum" className="text-blue-500 hover:underline block">Visit Doubt Forum</a>
            </div>
            <div className="p-4 border rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">Resources</h2>
              <a href="/resources" className="text-blue-500 hover:underline block">View Resources</a>
            </div>
            <div className="p-4 border rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">Blogs</h2>
              <a href="/blogs" className="text-blue-500 hover:underline block">Read Blogs</a>
            </div>
          </div>
        </div>
        }
              </div>
      );
}