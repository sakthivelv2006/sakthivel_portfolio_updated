import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Github = () => {
  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace 'sakthivel' with your actual GitHub username
  const fetchContributions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/github/contributions/sakthivel');
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setContributions(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching contributions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  // Use the exact colors from GitHub
  const getContributionStyle = (count, color) => {
    // Use the color provided by GitHub API
    if (color) {
      return { backgroundColor: color };
    }
    
    // Fallback to GitHub-like colors if color not provided
    if (count === 0) return { backgroundColor: '#ebedf0' };
    if (count < 3) return { backgroundColor: '#9be9a8' };
    if (count < 6) return { backgroundColor: '#40c463' };
    if (count < 9) return { backgroundColor: '#30a14e' };
    return { backgroundColor: '#216e39' };
  };

  const getMonthLabels = (weeks) => {
    const months = [];
    let lastMonth = -1;
    
    weeks.forEach((week, weekIndex) => {
      if (week.contributionDays.length > 0) {
        const firstDay = week.contributionDays[0];
        const date = new Date(firstDay.date);
        const month = date.getMonth();
        
        if (month !== lastMonth) {
          months.push({
            month,
            name: date.toLocaleString('default', { month: 'short' }),
            weekIndex
          });
          lastMonth = month;
        }
      }
    });
    
    return months;
  };

  const getDayName = (dayIndex) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dayIndex];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <p className="text-slate-400 text-sm">Loading GitHub contributions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-400 bg-red-400/10 rounded-lg border border-red-400/20">
        <p className="font-semibold">Failed to load contributions</p>
        <p className="text-sm text-slate-400 mt-1">{error}</p>
        <button 
          onClick={fetchContributions}
          className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!contributions) {
    return null;
  }

  const { weeks, totalContributions, colors } = contributions;
  const monthLabels = getMonthLabels(weeks);

  // Calculate current streak
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = weeks.length - 1; i >= 0; i--) {
    const week = weeks[i];
    for (let j = week.contributionDays.length - 1; j >= 0; j--) {
      const day = week.contributionDays[j];
      const dayDate = new Date(day.date);
      dayDate.setHours(0, 0, 0, 0);
      
      if (dayDate.getTime() === today.getTime()) {
        if (day.contributionCount > 0) {
          currentStreak++;
          // Continue checking previous days
          let checkDate = new Date(dayDate);
          for (let k = i; k >= 0; k--) {
            let found = false;
            for (let l = (k === i ? j - 1 : weeks[k].contributionDays.length - 1); l >= 0; l--) {
              const prevDay = weeks[k].contributionDays[l];
              const prevDayDate = new Date(prevDay.date);
              prevDayDate.setHours(0, 0, 0, 0);
              checkDate.setDate(checkDate.getDate() - 1);
              
              if (prevDayDate.getTime() === checkDate.getTime()) {
                if (prevDay.contributionCount > 0) {
                  currentStreak++;
                  found = true;
                  break;
                } else {
                  break;
                }
              }
            }
            if (!found) break;
          }
        }
        break;
      }
    }
    if (currentStreak > 0) break;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-green-400 mb-2">
          GitHub Contributions
        </h2>
        <p className="text-slate-300">
          <span className="text-green-400 font-semibold">{totalContributions}</span> contributions in the last year
          {currentStreak > 0 && (
            <span className="ml-2 text-orange-400">
              • {currentStreak} day streak
            </span>
          )}
        </p>
      </div>

      {/* Contribution Grid Container */}
      <div className="flex flex-col items-center">
        {/* Month Labels */}
        <div className="flex justify-start w-full max-w-[900px] mb-3 pl-14">
          {monthLabels.map((month, index) => (
            <span 
              key={index}
              className="text-xs text-slate-400 font-medium min-w-[60px]"
              style={{ 
                marginLeft: index === 0 ? '0' : 'auto'
              }}
            >
              {month.name}
            </span>
          ))}
        </div>

        <div className="flex gap-4 w-full max-w-[900px]">
          {/* Day Labels */}
          <div className="flex flex-col gap-[3px] pt-1">
            {[1, 3, 5].map(dayIndex => (
              <div key={dayIndex} className="h-3 text-xs text-slate-400 text-right pr-3">
                {getDayName(dayIndex)}
              </div>
            ))}
          </div>

          {/* Contributions Grid */}
          <div className="flex-1 overflow-x-auto pb-4">
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.contributionDays.map((day, dayIndex) => {
                    const date = new Date(day.date);
                    const today = new Date();
                    const isToday = date.toDateString() === today.toDateString();
                    
                    return (
                      <motion.div
                        key={day.date}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: (weekIndex * 7 + dayIndex) * 0.005 }}
                        className="w-3 h-3 rounded-sm border border-white/5"
                        style={getContributionStyle(day.contributionCount, day.color)}
                        title={`${date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`}
                      >
                        {isToday && (
                          <div className="w-full h-full rounded-sm border-2 border-white shadow-sm"></div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-6 text-xs text-slate-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#ebedf0' }}></div>
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#9be9a8' }}></div>
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#40c463' }}></div>
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#30a14e' }}></div>
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#216e39' }}></div>
          </div>
          <span>More</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-8 w-full max-w-md">
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="text-green-400 font-bold text-xl">
              {totalContributions}
            </div>
            <div className="text-slate-400 text-sm mt-1">Total</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="text-green-400 font-bold text-xl">
              {Math.round(totalContributions / 52)}
            </div>
            <div className="text-slate-400 text-sm mt-1">Avg/Week</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="text-green-400 font-bold text-xl">
              {currentStreak}
            </div>
            <div className="text-slate-400 text-sm mt-1">Current Streak</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="text-green-400 font-bold text-xl">
              {weeks[weeks.length - 1].contributionDays.reduce((sum, day) => sum + day.contributionCount, 0)}
            </div>
            <div className="text-slate-400 text-sm mt-1">This Week</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Github;