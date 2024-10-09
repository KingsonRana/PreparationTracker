import React, { useContext, useEffect } from "react";
import states from "../Context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
 
 const TopicRow=({topicdata, setType, openModal, setId, setName, setMinProblem})=>{
  const {setTopic,fetchProblems,deleteTopic} = useContext(states);
  const navigate = useNavigate();
  const handleClickDelete = async (id)=>{
   deleteTopic(id)
  }   

 
  const handleClickEdit = (id)=>{
    console.log("Clicked")
     setType(2)
     setId(id)
     setName(topicdata.name)
     setMinProblem(topicdata.minQuestion)
     openModal()
     
  }
  
    
    const createdOnReadable = new Date(topicdata.createdOn).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      
      const updatedOnReadable = new Date(topicdata.updatedOn).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      const navToProblems = (topicId)=>{
        navigate(`/${topicId}`)
      }
    return(
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted row" 
        onClick={(e)=>{navToProblems(topicdata.guid);}}
        >
         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{topicdata.id}</td>
         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{topicdata.name}</td>
         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{topicdata.minQuestion}</td>
         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{topicdata.questionSolved}</td>
         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{createdOnReadable}</td>
         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{updatedOnReadable}</td>
         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
           <div className="flex space-x-2">
           <button 
            onClick={(e)=>{
              e.stopPropagation();
              handleClickEdit(topicdata.guid)
            }}
           >
                  <FontAwesomeIcon icon={faPenFancy} className="edit"/>
                    </button>
                    <span></span>
                    <button 
                     onClick={(e)=>{
                      e.stopPropagation();
                         handleClickDelete(topicdata.guid);
                     }}
                    >            
          <FontAwesomeIcon icon={faTrashCan} className="delete"/>     
                    </button>
           </div>
         </td>
       </tr>
        
    )
}
export default  TopicRow;