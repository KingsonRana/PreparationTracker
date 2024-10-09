import { faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";

export default function SortBy({ name, sort,sortOrder, sortKey}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref to track the dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleAscending = ()=>{
   sort(name,'asc')
  } 
  const handleDescending = ()=>{
    sort(name, 'desc')
  }

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left"
      style={{ padding: "5px", marginLeft: "5px" }}
    >
      <div>
        <button
          type="button"
          className={`inline-flex w-full justify-center gap-x-1.5 rounded-md bg-black text-white font-light px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white-50 ${name===sortKey?`active`:``}`}
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {name.charAt(0).toUpperCase()+name.slice(1)}
          <FontAwesomeIcon className="-mr-1 h-3 w-3 text-gray-400 sortIcon" icon={faCaretDown} />
          {name===sortKey?(<FontAwesomeIcon  className="-mr-1 h-3 w-3 text-400 sortIcon sortIconCross" icon={faXmark} 
          onClick={()=>{sort("default","asc")}} />):""}
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1 sortbtn" role="none">
            <button
              className={`block px-4 py-2 text-sm text-gray-700  ${name===sortKey&&sortOrder==='asc'?`active`:``}`}
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
              onClick={() => {
                console.log("Ascending");
                handleAscending()
                setIsOpen(false);
              }}
            >
              Ascending
            </button>
            <button
              className={`block px-4 py-2 text-sm text-gray-700  ${name===sortKey&&sortOrder==='desc'?`active`:``}`}
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
              onClick={() => {
                console.log("Descending");
                handleDescending()
                setIsOpen(false);  
              }}
            >
              Descending
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
