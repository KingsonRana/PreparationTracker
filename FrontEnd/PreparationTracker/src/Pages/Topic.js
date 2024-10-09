import React, { useContext, useState, useEffect } from "react";
import states from "../Context/context";
import TopicRow from "../Component/TopicRow";
import CreateTopic from "../Component/Forms/CreateTopic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SortBy from "../Component/SortBy";
import { getComparator } from "../Utils/sortUtil";

export default function TopicCard() {
  const { topic, loading } = useContext(states);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState();
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [minProblems, setMinProblems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("default");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredTopics, setFilteredTopics] = useState(topic);

  // Filter topics based on search query

  useEffect(() => {
    const filtered = topic.filter((t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTopics(filtered);
  }, [topic, searchQuery]);

  // Sort filtered topics based on sort key and order
  useEffect(() => {
    const comparator = getComparator(sortKey, sortOrder);
    setFilteredTopics((prevTopics) => [...prevTopics].sort(comparator));
  }, [topic, sortKey, sortOrder]);

 


  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setId(null);
    setName("");
    setMinProblems(0);
  };

  const keys = topic[0] ? Object.keys(topic[0]) : [];

  const handleSort = (name, order) => {
    setSortKey(name);
    setSortOrder(order);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 dataContainer">
      <CreateTopic
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        type={type}
        id={id}
        tName={name}
        tminProb={minProblems}
      />
      <div className="dataContainerChild">
      <div className="flex justify-between items-center mb-4 dataContainerHeader">
        <h2 className="text-lg font-bold">Dsa Topics</h2>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 bg-green-500 text-white"
          onClick={() => {
            setType(1);
            openModal();
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="h-5 w-5 mr-2" />
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
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      </div>
      <div className="dataContainerChild" style={{ height: "70%" }}>
      <div className="mb-4">
        <div style={{ display: "flex", alignItems: "center", padding:"5px" }}>
         <div> <p className="text-lg">Sort By : </p></div>
          {keys.map((key, index) => (
            <SortBy
              key={index}
              name={key}
              setSortKey={setSortKey}
              setSortOrder={setSortOrder}
              sort={handleSort}
              sortOrder={sortOrder}
              sortKey={sortKey}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-auto card">
        <div style={{ height: "100%" }}>
          {loading ? (
            <div className="loaderParent">
              <div className="loader"></div>
            </div>
          ) : (
            <table className="w-full caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Id</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Min Problems</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Solved</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Created</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Updated</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Actions</th>
                </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
                {filteredTopics.map((topic, index) => (
                  <TopicRow
                    key={index}
                    topicdata={topic}
                    setType={setType}
                    openModal={openModal}
                    setId={setId}
                    setName={setName}
                    setMinProblem={setMinProblems}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
