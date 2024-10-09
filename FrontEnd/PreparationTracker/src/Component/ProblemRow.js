import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";
import states from "../Context/context";
import { useNavigate } from "react-router-dom";

export default function ProblemRow({problem,openModal,setType,setId,setName, setLevel, setLink, setRequireRework, topicId}){

  const navigate = useNavigate()
  const {deleteproblem} = useContext(states);
 const handleClickDelete = (id)=>{
    alert(" delete id " + id)
    deleteproblem(id);
 }

 const handleClickEdit = ()=>{
  setType(2)
  setId(problem.guid)
  setName(problem.name)
  setLevel(problem.level)
  setLink(problem.link)
  setRequireRework(problem.requireReWork)
  setRequireRework(problem.requireReWork)
  openModal()
 }

const createdOnReadable = new Date(problem.createdOn).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  
  const updatedOnReadable = new Date(problem.updatedOn).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hsour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

   const navToProblemDetail = ()=>{
     navigate(`/problemDetail/${topicId}/${problem.guid}`)
  }

    return (
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" onClick={()=>{navToProblemDetail()}}>
               <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{problem.id}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{problem.name}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{createdOnReadable}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{updatedOnReadable}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <a className="text-blue-500 hover:underline" href={`${problem.link}`} >
                    View
                  </a>
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{problem.level===0?"Easy":problem.level===1?"Medium":"Hard"}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{problem.requireReWork===0?"No":"Yes"}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div className="flex space-x-2">
                    <button onClick={()=>{handleClickEdit()}}>
                    <FontAwesomeIcon icon={faPenFancy} className="edit"/>
                    </button>
                    <button onClick={()=>{handleClickDelete(problem.guid)}}>
                       <FontAwesomeIcon icon={faTrashCan} className="delete"/>
                    </button>
                  </div>
                </td>
              </tr>
    )
}