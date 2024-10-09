import React, { useContext, useEffect, useState } from "react";
import states from "../Context/context";
import ProblemRow from "../Component/ProblemRow";
import CreateProblem from "../Component/Forms/CreateProbelm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { getComparator } from "../Utils/sortUtil";
import SortBy from "../Component/SortBy";
import TopicToggle from "../Component/TopicToggle";

export default function ProblemCard(){
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type,setType] = useState(null);
  const [id, setId] = useState(null)
  const openModal = () =>{ setModalIsOpen(true);}
  const closeModal = () => {setModalIsOpen(false); setId(null) ;setName(''); setLevel(''); setLink('');setRequireRework('')};
  const {problems,loading,fetchProblems} = useContext(states)
  const { topicId } = useParams();
  const [name, setName] = useState();
  const [level, setLevel] = useState();
  const [link, setLink] = useState();
  const [requireRework, setRequireRework] = useState();
  const [searchQuery,setSearchQuery] = useState("")
  const [sortKey, setSortKey] = useState("default");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredProblems,setFilteredProblems] = useState(problems)

  useEffect(()=>{
    fetchProblems(topicId)
  },[topicId,fetchProblems])

  useEffect(() => {
    const filtered = problems.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProblems(filtered);
  }, [problems, searchQuery]);

  
  const keys = problems[0] ? Object.keys(problems[0]) : [];

  const handleSort = (name, order) => {
    setSortKey(name);
    setSortOrder(order);
  };
  useEffect(() => {
    const comparator = getComparator(sortKey, sortOrder);
    setFilteredProblems((prevProblems) => [...prevProblems].sort(comparator));
  }, [problems,sortKey, sortOrder]);

  

    return(
        <div className="bg-white shadow-md rounded-lg p-6 dataContainer">
        <CreateProblem modalIsOpen={modalIsOpen} closeModal={closeModal} type={type} id={id} topicId={topicId} pname={name} plevel={level} plink={link} prequireRework={requireRework}/>
        <div className="flex justify-between items-center mb-4 dataContainerHeader">
          <TopicToggle/>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 bg-green-500 text-white"  
        onClick={()=>{
        setType(1);
        openModal();}
      }
        >
          <FontAwesomeIcon icon={faPlus   } style={{width:"24",height:"24" , viewBox:"0 0 24 24", fill:"none", stroke:"currentcolor",strokeWidth:"2",
                    strokeLinecap:"round",
                    strokeLinejoin:"round"
                  }}   className="h-5 w-5 mr-2"/>
            Add New
          </button>
        </div>
        <div className="mb-4 dataContainerHeader">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              className="flex h-10 w-full border border-input px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search topics..."
              value={searchQuery} // Bind input value to state
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
              type="text"
            />
          </div>
        </div>
        <div className="mb-4">
        <div style={{ display: "flex", alignItems: "center" }}>
        <p className="text-lg">Sort By : </p>
          {keys.map((key, index) => (
            key!=='link'?
            <SortBy
              key={index}
              name={key}
              sort={handleSort}
              sortOrder={sortOrder}
              sortKey={sortKey}
            />:""
          ))}
        </div>
      </div>

        <div className="relative w-full overflow-auto card">
          
          { loading?(
            
            <div className="loaderParent"><div className="loader"></div></div>
           
           ):(
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Id
            </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Created 
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Updated
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Link
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Difficulty
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Rework 
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
           
                {
                  filteredProblems.map((problem,index)=>{
                  
                    return(
                     <ProblemRow key={index} problem={problem} openModal={openModal} setType={setType} setId={setId} setName={setName} setLevel={setLevel} setLink={setLink} setRequireRework={setRequireRework} topicId={topicId}/>
                    )
                  })
                }
          </tbody>
          </table>)}
          </div>
        
      </div> 
    )
}