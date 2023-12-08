import { BookOpenIcon, CircleDashedIcon, FileBoxIcon, LayoutDashboardIcon, LogOut, PhoneCallIcon, SidebarCloseIcon, ToggleLeftIcon, UserCircle2Icon, Users2 } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {GiGraduateCap} from 'react-icons/gi'
import {AiOutlineMenu} from 'react-icons/ai'
const Sideb = () => {
  const [open, setOpen] = useState(true);
  const [active,setactive] = useState();
  const Menus = [
    { title: "Dashboard", src: LayoutDashboardIcon ,link:'/dashboard'},
    { title: "Profile", src: UserCircle2Icon ,link:'/profile'},
    { title: "Resources", src: BookOpenIcon, gap: true ,link: '/resources'},
    { title: "Blogs ", src: FileBoxIcon,link:'/blogs' },
    { title: "Doubt forum", src: Users2 ,link:'/doubtforum'},
    { title: "Contact us", src: PhoneCallIcon ,link:'/contactus' },
    // { title: "Log out", src: LogOut, gap: true,link:'/' }
  ];
  
  const navigate= useNavigate();
  return (
    <div className="flex max-h-screen fixed top-0 left-0">
      <div
        className={` ${
          open ? "w-68" : "w-20 "
        } bg-richblack-900 overflow-hidden h-screen p-5  pt-8 relative duration-300 bg-slate-900`}
      >
          <AiOutlineMenu className={`absolute cursor-pointer text-gray-100 left-4 top-4 text-[40px]  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)} ></AiOutlineMenu>
        <div className="flex gap-x-4 items-center">
         
        <NavLink to={"/"} className={`font-bold text-2xl drop-shadow-lg flex items-center mt-8 ${!open && "scale-0"} `}><span><GiGraduateCap className='text-blue-500 text-3xl'></GiGraduateCap></span><span className='text-blue-500'>Grade</span><span className='text-white'>Sarthi</span></NavLink>
        </div>
        <ul className="pt-6 overflow-y-auto mt-0">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex font-semibold text-lg  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300  items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === active && "bg-light-white"
              } `} onClick={()=>{setactive(index) ; navigate(Menu.link)}}
            >
              <Menu.src></Menu.src>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
          <li
              key={6}
              className={`flex font-semibold text-lg  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300  items-center gap-x-4 
              ${true ? "mt-9" : "mt-2"} ${
                active === 6 && "bg-light-white"
              } `} onClick={()=>{setactive(6) ; navigate("/"); localStorage.removeItem("email");localStorage.removeItem("token");}}
            >
              <LogOut/>
              <span onClick={()=>{setactive(6) ; navigate("/"); localStorage.removeItem("email");localStorage.removeItem("token"); localStorage.removeItem("name")}}
              className={`${!open && "hidden"} origin-left duration-200`}>
                LogOut
              </span>
            </li>
        </ul>
      </div>
    </div>
  );
};
export default Sideb;
