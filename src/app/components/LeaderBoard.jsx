import React from "react";

function Leaderboard({ name, score, avatar }) {
  const leaderboardData = [
    { name: "Rahul", score: 8 },
    { name: "Janmesh", score: 7 },
    { name: "Vaibhai", score: 5 },
    // ... Add more players as needed
  ];

  const top3 = leaderboardData.slice(0, 3);

  return (
    <div className="container mx-auto my-[200px] py-16">
      <h1 className="text-3xl font-bold text-center mb-8 ">Leaderboard</h1>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-[100px] px-[30px]">
        <div className="grid-colspan-1 bg-red-400 rounded-[20px] mt-[50px] w-[350px] h-[160px]">
        <div className="flex flex-col items-center justify-center bg-black shadow-lg rounded-[20px] border-4 border-yellow-500 p-6 w-[100%]">
            {/* Crown Icon */}
            <div className="text-yellow-500 text-[50px] mb-2">👑</div>
            {/* Avatar */}
            <div className="mb-4">
              <img
                src={avatar || "data:image/jpeg;base64,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"} // default avatar if none provided
                alt="avatar"
                width={200}
                height={150}
                className="rounded-full border-4 border-yellow-500"
              />
            </div>
            {/* Name */}
            <h2 className="text-[30px] font-bold text-black">
              {/* {name || "User Name"} */}
              Rahul
            </h2>
            {/* Score */}
            <div className="text-[25px] text-gray-600">Score: {score || 21}</div>
            {/* 1st Position Label */}
            <div className="mt-4 text-yellow-500 text-[20px] font-bold">
              2nd Place
            </div>
          </div>
        </div>
        <div className="grid-colspan-1 bg-red-400 rounded-[20px]  h-[160px]">
          <div className="flex flex-col items-center justify-center bg-black shadow-lg rounded-[20px] border-4 border-yellow-500 p-6 w-[100%]">
            {/* Crown Icon */}
            <div className="text-yellow-500 text-[50px] mb-2">👑</div>
            {/* Avatar */}
            <div className="mb-4">
              <img
                src={avatar || "data:image/jpeg;base64,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"} // default avatar if none provided
                alt="avatar"
                width={200}
                height={150}
                className="rounded-full border-4 border-yellow-500"
              />
            </div>
            {/* Name */}
            <h2 className="text-[30px] font-bold text-black">
              {/* {name || "User Name"} */}
              Vaibhav
            </h2>
            {/* Score */}
            <div className="text-[25px] text-gray-600">Score: {score || 32}</div>
            {/* 1st Position Label */}
            <div className="mt-4 text-yellow-500 text-[20px] font-bold">
              1st Place
            </div>
          </div>
        </div>
        <div className="grid-colspan-1 bg-red-400 rounded-[20px] w-[350px] mt-[70px] h-[160px]">
        <div className="flex flex-col items-center justify-center bg-black shadow-lg rounded-[20px] border-4 border-yellow-500 p-6 w-[100%]">
            {/* Crown Icon */}
            <div className="text-yellow-500 text-[50px] mb-2">👑</div>
            {/* Avatar */}
            <div className="mb-4">
              <img
                src={avatar || "data:image/jpeg;base64,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"} // default avatar if none provided
                alt="avatar"
                width={200}
                height={150}
                className="rounded-full border-4 border-yellow-500"
              />
            </div>
            {/* Name */}
            <h2 className="text-[30px] font-bold text-black">
              {/* {name || "User Name"} */}
              Sachin
            </h2>
            {/* Score */}
            <div className="text-[25px] text-gray-600">Score:17</div>
            {/* 1st Position Label */}
            <div className="mt-4 text-yellow-500 text-[20px] font-bold">
              3rd Place
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
