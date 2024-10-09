import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "../Component/Search";
import ExamPreparationForm from "../Component/Forms/ExamPlan";
import { useState } from "react";

export default function Exams(){
    const [form, setForm] = useState(false)
    const toggle = function(){
        setForm(!form)
    }
    return(
        <div className="flex flex-col overflow-y-auto">
        <div className="componentbackground m-[0px] p-4 createPlan flex-1 flex pl-[2px] pr-[2px]">
            <button className="m-auto flex-1" onClick={toggle}>
                <FontAwesomeIcon icon={faPlus}/>
            </button>
            <div className="flex-4">
            <Search  placeholder="Search Exam ..."/>            
           </div>
            <button className="m-auto flex-1">
                <FontAwesomeIcon icon={faEllipsis} />
            </button>

        </div>
        <div className="flex flex-2">
        <div className={`flex flex-col transition-all duration-300 overflow-hidden ${form ? 'max-h-screen' : 'max-h-0'}`}>
          {form&&<ExamPreparationForm clicked={form} setForm={setForm}/>}
          </div>
        </div>
        </div>
    )
}