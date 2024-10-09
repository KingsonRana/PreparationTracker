
import { faBars, faBell, faBullhorn, faChartPie, faCircleInfo, faPeopleGroup, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Sidebar(){
  const navigate =  useNavigate();
  const [sideBarState, setSideBarState] = useState(false)
    return(
<div className="componentbackground shadow-md p-4 ">
  
              <nav className="space-y-4">
              <div className="flex items-center hover:text-blue-500 focus:outline-none focus:text-blue-500 sidebarbutton" 
                onClick={()=>{
                 setSideBarState(!sideBarState)
                }} style={{color:"black"}}>
              <FontAwesomeIcon icon={faBars} style={{width:"18",height:"18" , viewBox:"0 0 24 24", fill:"none", stroke:"currentcolor",strokeWidth:"2",
                    strokeLinecap:"round",
                    strokeLinejoin:"round"
                  }}   className="h-5 w-5"/>
                    {sideBarState&&<span className="items-center ml-1" >Menu</span>}
                 
                  </div>
                  <div className="flex w-full h-[0.2px] bg-[#FFFFFF]"></div>
                <div className="flex items-center  hover:text-blue-500 focus:outline-none focus:text-blue-500 sidebarbutton" 
                onClick={()=>{
                  navigate('/')
                }}  style={{color:"black"}}>
                   <FontAwesomeIcon icon={faHome} style={{width:"18",height:"18" , viewBox:"0 0 24 24", fill:"none", stroke:"currentcolor",strokeWidth:"2",
                    strokeLinecap:"round",
                    strokeLinejoin:"round"
                  }}   className="h-5 w-5 "/>
                  {sideBarState&&<span className="items-center ml-1" >Home</span>}
                 
                </div>
                <div className="flex items-center hover:text-blue-500 focus:outline-none focus:text-blue-500 sidebarbutton" 
                onClick={()=>{
                  navigate("/topic")
                }}
                style={{color:"black"}}
                >
                <FontAwesomeIcon icon={faChartPie} style={{width:"18",height:"18" , viewBox:"0 0 24 24", fill:"none", stroke:"currentcolor",strokeWidth:"2",
                    strokeLinecap:"round",
                    strokeLinejoin:"round"
                  }}   className="h-5 w-5 "/>
                  
                  {sideBarState&& <span className="items-center ml-1">Progress</span>}
                </div>
               
        <div
          className="flex items-center text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 sidebarbutton"
          href="#"
          style={{color:"black"}}
        >
        <FontAwesomeIcon icon={faBell} style={{width:"18",height:"18" , viewBox:"0 0 24 24", fill:"none", stroke:"currentcolor",strokeWidth:"2",
                    strokeLinecap:"round",
                    strokeLinejoin:"round"
                  }}   className="h-5 w-5 "/>
          {sideBarState&&  <span className="items-center ml-1">Notifications</span>}
        </div>
        <div
          className="flex items-center text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 sidebarbutton"
          onClick={()=>{
            navigate('/About')
          }}
          style={{color:"black"}}
          >
             <FontAwesomeIcon icon={faPeopleGroup} style={{width:"18",height:"18" , viewBox:"0 0 24 24", fill:"none", stroke:"currentcolor",strokeWidth:"2",
                    strokeLinecap:"round",
                    strokeLinejoin:"round"
                  }}   className="h-5 w-5 "/>
         {sideBarState&&   <span className="items-center ml-1">Friends</span>}
        </div>
        <div
          className="flex items-center text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 sidebarbutton"
          onClick={()=>{
            navigate('/About')
          }}
          style={{color:"black"}}
          >
             <FontAwesomeIcon icon={faBullhorn} style={{width:"18",height:"18" , viewBox:"0 0 24 24", fill:"none", stroke:"currentcolor",strokeWidth:"2",
                    strokeLinecap:"round",
                    strokeLinejoin:"round"
                  }}   className="h-5 w-5 "/>
         {sideBarState&&   <span className="items-center ml-1">Challenges</span>}
        </div>
        <div
          className="flex items-center text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 sidebarbutton"
          onClick={()=>{
            navigate('/About')
          }}
          style={{color:"black"}}
        >
         <FontAwesomeIcon icon={faCircleInfo} style={{width:"18",height:"18" , viewBox:"0 0 24 24", fill:"none", stroke:"currentcolor",strokeWidth:"2",
                    strokeLinecap:"round",
                    strokeLinejoin:"round"
                  }}   className="h-5 w-5 "/> 
          {sideBarState&&  <span className="items-center ml-1">About</span>}
        </div>
              </nav>
            </div>

    )
}