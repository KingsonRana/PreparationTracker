import React, { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import states from "../../Context/context";

export default function CreateProblem({ modalIsOpen, closeModal, type, id, topicId, pname, plevel, plink, prequireRework }) {
  const { addProblem,updateProblem } = useContext(states);
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [link, setLink] = useState('');
  const [requireRework, setRequireRework] = useState('');

  useEffect(() => {
    setName(pname);
    setLevel(plevel===0?'Easy':plevel===1?'Medium':plevel===2?'Hard':"");
    setLink(plink);
    setRequireRework(prequireRework===0?'No':prequireRework===1?'Yes':"");
  }, [pname, plevel, plink, prequireRework]);

  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (!name || !level || !link || !requireRework) {
      alert("Please fill out all required fields.");
      return;
    }
    const getLevelInt = (level) => {
      console.log(`getLevelInt called with: ${level}`); // Debug output
      return level === 'Easy' ? 0 :
             level === 'Medium' ? 1 :
             level === 'Hard' ? 2 :
             null; // or handle unknown levels
    };
  
    // Using ternary operators for requireRework mapping
    const getRequireReworkInt = (requireRework) => {
      console.log(`getRequireReworkInt called with: ${requireRework}`); // Debug output
      return requireRework === 'Yes' ? 1 :
             requireRework === 'No' ? 0 :
             null; // or handle unknown values
    };
  
    const levelInt = getLevelInt(level)
    const reWorkInt = getRequireReworkInt(requireRework)
    console.log(levelInt + " " + reWorkInt)

    addProblem({ name, levelInt, link, reWorkInt }, topicId);
    setName("");
    setLevel("");
    setLink("");
    setRequireRework("");
    closeModal();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!name || !level || !link || !requireRework) {
      alert("Please fill out all required fields." + name + " " + level + " " + link + " " + requireRework);
    }
    const getLevelInt = (level) => {
      return level === 'Easy' ? 0 :
             level === 'Medium' ? 1 :
             level === 'Hard' ? 2 :
             null; 
    };
  
    
    const getRequireReworkInt = (requireRework) => {
      return requireRework === 'Yes' ? 1 :
             requireRework === 'No' ? 0 :
             null; 
    };
  
    const levelInt = getLevelInt(level)
    const reWorkInt = getRequireReworkInt(requireRework)
    console.log(levelInt + " " + reWorkInt)

    updateProblem({ name, levelInt, link, reWorkInt }, id);
    setName("");
    setLevel("");
    setLink("");
    setRequireRework("");
    closeModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="fixed inset-0 flex items-center justify-center p-4 cursor-pointer"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white shadow-md p-6 relative modal">
        <form onSubmit={(e) => (type === 1 ? handleSubmit(e) : handleEditSubmit(e))}>
          <div className="space-y-4">
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                id="name"
                placeholder="Enter name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                htmlFor="level"
              >
                Level
              </label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                id="level"
                value={level}
                onChange={(e) =>  setLevel(e.target.value)}
                required
              >
                <option value="" disabled>Select level</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="link"
              >
                Link
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                id="link"
                placeholder="Enter link"
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="requireRework"
              >
                Require Rework
              </label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                id="requireRework"
                value={requireRework}
                onChange={(e) => setRequireRework(e.target.value)}
                required
              >
                <option value="" disabled>Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
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
  );
}
