import React from 'react'

function Card({ username, btnText = "visit me" }) {
  return (
    <div className="relative h-[300px] w-[220px] rounded-md overflow-hidden">
      
      <img
  src="https://images.unsplash.com/photo-1546961329-78bef0414d7c"
  alt="card"
  className="h-[200px] w-full object-cover"
/>

      <div className="w-[250px] rounded-xl overflow-hidden shadow-lg bg-white">
  
  <img
    src="https://images.unsplash.com/photo-1546961329-78bef0414d7c"
    alt="card"
    className="h-[180px] w-full object-cover"
  />

  <div className="p-4">
    <h1 className="text-lg font-semibold">{username}</h1>

    <p className="text-sm text-gray-600 mt-2">
      Simple clean card UI
    </p>

    <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded">
      {btnText}
    </button>
  </div>

</div>
    </div>
  )
}

export default Card