import React, { useState } from 'react'

export default function TopicToggle() {
  const [selectedTopic, setSelectedTopic] = useState('Problems')

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg topicToggle">
     
      <div className="flex p-1 bg-white rounded-md shadow-sm">
      {/* <p className="text-lg text-gray-500"style={{marginRight:"5px"}}>
        Currently viewing: <span className="font-semibold">{selectedTopic}</span> 
      </p> */}
       <button
 
  className={`bg-transparent ${selectedTopic === 'Problems' ? 'text-black-500' : 'text-gray-500' } hover:text-black border-none italic`}
  onClick={() => setSelectedTopic('Problems')}
>
          Problems 
        </button>
        <span className='px-1'> / </span>
        <button
 
 className={`bg-transparent ${selectedTopic === 'Sub Topics' ?  'text-black-500' :  'text-gray-500' } hover:text-black border-none italic`}
 onClick={() => setSelectedTopic('Sub Topics')}
>
          Sub Topics
        </button>
      </div>
    
    </div>
  )
}