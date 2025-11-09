import React, { useEffect, useState } from "react";

const LeetCodeContributions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = "sakthivelv202222";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/github/contributions/${username}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  if (loading) return <p className="text-white">Loading LeetCode contributions...</p>;
  if (!data) return <p className="text-red-400">Failed to load contributions</p>;

  return (
    <div className="p-10 bg-black text-white min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">LeetCode Contributions – {username}</h2>
      <div className="flex flex-wrap w-full max-w-[900px] gap-1 bg-white p-4 rounded-xl">
        {Object.entries(data.contributionsByDay).map(([date, count]) => (
          <div
            key={date}
            style={{
              width: 15,
              height: 15,
              backgroundColor:
                count === 0 ? "#ebedf0" :
                count < 3 ? "#9be9a8" :
                count < 6 ? "#40c463" :
                count < 9 ? "#30a14e" : "#216e39"
            }}
            title={`${date}: ${count} submissions`}
            className="rounded-sm"
          />
        ))}
      </div>
      <p className="mt-4 text-green-400 text-lg">Total Contributions: {data.totalContributions}</p>
    </div>
  );
};

export default LeetCodeContributions;
