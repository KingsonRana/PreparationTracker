import React, { useEffect, useState, useCallback } from "react";
import states from "./context"

const ManageState = (props)=>{
 const [topic,setTopic] = useState([])
 const [problems,setProblems] = useState([])
 const [loading, setLoading] = useState(false)

 const fetchTopic = async ()=>{
  setLoading(true)
    const url = "https://localhost:7156/getAllTopics"
    const option = {
        method: 'GET',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json'
  }
    }
    let response
    try{
     response = await fetch(url, option)
     let data = await response.json()
     setTopic(data)
     console.log(data)
    }catch(e){
      console.log(e)
    }
    
  
    setLoading(false)
 }

 const fetchProblems = useCallback(async (topicId) => {
  setLoading(true);
  console.log(topicId)
  console.log(`https://localhost:7156/getProblems/${topicId}`)
  const url = `https://localhost:7156/getProblems/${topicId}`;
  const option = {
    method: 'GET',
    headers: {
      'Accept': 'text/plain',
        'Content-Type': 'application/json'
    }
  };

  let response;
  try {
    response = await fetch(url, option);
    let data = await response.json();
    console.log(data)
    setProblems(data);
  } catch (e) {
    console.log("error while fetching");
  }

 

  setLoading(false);
}, []); // Empty array ensures fetchProblems is memoized and does not change

 const addTopic = async (name, minQuestion)=>{
  setLoading(true)
  try {
    const response = await fetch('https://localhost:7156/addTopic', {
      method: 'POST',
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      name,
      minQuestion
      })
    });
    
    if (response.ok) {
      const data = await response.json();  // Or response.json() if the response is JSON
      console.log('Success:', data);
      setTopic((prevTopic)=>[...prevTopic,data]);
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  setLoading(false)
 }
 const editTopic = async (name, minQuestion, id) => {
  setLoading(true);

  try {
    const response = await fetch(`https://localhost:7156/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json', // Changed to 'application/json' as it's more standard for JSON responses
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        minQuestion
      })
    });

    if (response.ok) {
      const updatedTopic = await response.json();

      // Log the updated topic for debugging
      console.log('Update successful:', updatedTopic);

      // Update the topic state
      setTopic((prevTopics) => 
        prevTopics.map((topic) => 
          topic.guid === id ? updatedTopic : topic
        )
      );
    } else {
      // Handle non-OK responses
      console.error('Failed to update topic:', response.statusText);
    }
  } catch (error) {
    // Log the error
    console.error('Error updating topic:', error);
  } finally {
    setLoading(false);
  }
};

const deleteTopic = async (id)=>{
  setLoading(true)
  try{
    console.log(id)
    const response = await fetch(`https://localhost:7156/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if(response.status===204){
      console.log("Deleted Succesfully")
      setTopic((prevTopics)=>prevTopics.filter(prevTopic=>prevTopic.guid !== id))
    }
    else if (response.status === 404) {
      // Topic not found
      console.error('Topic not found');
    } else {
      // Handle other status codes
      console.error('Error deleting topic:', response.statusText);
    }
  }catch(e){
    console.error('Error:', e);
  }
  setLoading(false)
}

const addProblem = async(requestData,id)=>{
  setLoading(true)
  const createRequest = {name:requestData.name,level : requestData.levelInt, link :requestData.link, requireReWork:requestData.reWorkInt}
try{
  const response = await fetch(`https://localhost:7156/addProblems/${id}`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(createRequest) 
  });
  if (response.ok) {
    fetchTopic()
    const data = await response.json();  
    console.log('Success:', data);
    setProblems((prevProblems)=>[...prevProblems,data]);
  } else {
    console.error('Error:', response.statusText);
  }
}catch (e){
  console.log(e)
}
  setLoading(false)
}

const deleteproblem = async (problemId)=>{
 setLoading(true)
 try{
  console.log(problemId)
  const response = await fetch(`https://localhost:7156/deleteProblem/${problemId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  if(response.status===204){
    fetchTopic()
    console.log("Deleted Succesfully")  
    setProblems((prevProblems)=>prevProblems.filter(prevProblems=>prevProblems.guid !== problemId))
  }
  else if (response.status === 404) {
    
    console.error('Problem not found');
  } else {
    // Handle other status codes
    console.error('Error deleting problem:', response.statusText);
  }
}catch(e){
  console.error('Error:', e);
}
setLoading(false)
 
}

const updateProblem=async (requestData, id)=>{
  const createRequest = {name:requestData.name,level : requestData.levelInt, link :requestData.link, requireReWork:requestData.reWorkInt}
  try {
    const response = await fetch(` https://localhost:7156/updateProblem/${id}`, {
      method: 'PUT', 
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createRequest)
    });
    if (response.ok) {
      const updatedProblem = await response.json();
      console.log(updatedProblem)
      // Update the problems in the context
      setProblems((prevProblems) => prevProblems.map((problem) =>
          problem.guid === id ? updatedProblem : problem
        )
      );

      console.log('Update successful:', updatedProblem);
    }
   
  } catch (error) {
   console.log(error)
  }
  setLoading(false)



}
 useEffect(()=>{
    try{
        fetchTopic();
    }
    catch (e){
      console.log("Something went wrong")
    }
 },[])

    return(
        <states.Provider
         value={{topic,fetchProblems,problems,addTopic,editTopic,deleteTopic,loading, addProblem,deleteproblem,updateProblem}}
        >
            { props.children}
        </states.Provider>
    )
}

export default ManageState