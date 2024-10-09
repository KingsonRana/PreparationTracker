 import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import states from "../../Context/context";

// Set the app element for accessibility (optional)

export default function CreateTopic({modalIsOpen,closeModal, type, id, tName, tminProb}){
  const [name,setName] = useState()
  const [minQuestion, setMinQuestion] = useState();
  const {addTopic, editTopic} = useContext(states);

 useEffect(()=>{
  setName(tName)
  setMinQuestion(tminProb)
 },[tName,tminProb])
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    addTopic(name,minQuestion)
    setName("");
    setMinQuestion(0);
    closeModal();
    
  };
 
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    editTopic(name.length===0?tName:name,minQuestion,id)
    setName("");
    setMinQuestion(0);
    closeModal();
    
  };
    return (  <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white shadow-md p-6 relative max-w-md mx-auto modal">
        <form  onSubmit={(e)=>{type===1?handleSubmit(e):handleEditSubmit(e)}}>
          <div className="space-y-4">
            <div>
              <label
                className="text-sm font-medium leading-none"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                id="name"
                placeholder="Enter Topic name"
                type="text"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
              />
            </div>
            <div>
              <label
                className="text-sm font-medium leading-none"
                htmlFor="minQuestions"
              >
                Minimum Questions
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                id="minQuestions"
                placeholder="Enter min problems"
                type="number"
                value={minQuestion}
                onChange={(e)=>{setMinQuestion(e.target.value)}}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
              
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </Modal>

    )
}