import Exams from "./Exam";

export default function Home(){
    return(
        <div className="flex h-full">
            <div className="flex-1">
             <Exams/>
            </div>
            <div className="flex-[3]">
                <div className="bg-white h-full p-2 ">
            Welcome to Progress tracker
            </div>
            </div>
            
        </div>
    )
}