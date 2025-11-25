import React, { useEffect, useState } from "react";

const Github = () => {
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = "sakthivel182006";

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/github/contributions/${username}`);
        const data = await res.json();
        setCalendar(data);
      } catch (err) {
        console.error("Error fetching contributions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCalendar();
  }, []);

  if (loading) return <p className="text-white">Loading contributions...</p>;
  if (!calendar) return <p className="text-red-400">Failed to load contributions</p>;

  const getMonthLabels = () => {
    const labels = [];
    let lastMonth = -1;
    calendar.weeks.forEach((week, index) => {
      if (week.contributionDays.length > 0) {
        const month = new Date(week.contributionDays[0].date).getMonth();
        if (month !== lastMonth) {
          labels.push({ name: new Date(week.contributionDays[0].date).toLocaleString("default", { month: "short" }), weekIndex: index });
          lastMonth = month;
        }
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-10 bg-black min-h-screen flex flex-col items-center text-white">
      <h2 className="text-3xl font-bold mb-6">My GitHub Contributions</h2>

      {/* Month Labels */}
      <div className="flex justify-start w-full max-w-[920px] mb-2 pl-8">
        {monthLabels.map((month, idx) => (
          <span
            key={idx}
            className="text-sm font-semibold text-black"
            style={{ marginLeft: idx === 0 ? 0 : "auto" }}
          >
            {month.name}
          </span>
        ))}
      </div>

      {/* Calendar Card */}
      <div className="flex w-full max-w-[920px] bg-white p-4 rounded-xl shadow-lg">
        {/* Day Labels */}
        <div className="flex flex-col gap-1 pt-1 pr-2">
          {daysOfWeek.map((day, idx) => (
            <span key={idx} className="text-xs text-black h-3">{day}</span>
          ))}
        </div>

        {/* Contribution Grid */}
        <div className="flex gap-1 overflow-x-auto">
          {calendar.weeks.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-1">
              {week.contributionDays.map((day, dIndex) => (
                <div
                  key={dIndex}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: day.color }}
                  title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-green-400 text-lg">
        Total Contions: {calendar.totalContributions}
      </p>
    </div>
  );
};

export default Github;
