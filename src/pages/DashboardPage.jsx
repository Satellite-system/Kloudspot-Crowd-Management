import React from 'react'
import {
LineChart,
PieChart,
  Pie,
  Cell,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer,
ReferenceLine
} from "recharts";
import { FiCalendar } from "react-icons/fi";
import maleGraph from "./../assets/icons/maleGraph.png"
import femaleGraph from "./../assets/icons/femaleGraph.png"
import DateSelector from '../components/DateSelector';


function DashboardPage() {

const stats = [
{
title: "Live Occupancy",
value: "734",
change: "+10%",
positive: true,
subtitle: "More than yesterday",
},
{
title: "Today’s Footfall",
value: "2,436",
change: "-10%",
positive: false,
subtitle: "Less than yesterday",
},
{
title: "Avg Dwell Time",
value: "08min 30sec",
change: "+6%",
positive: true,
subtitle: "More than yesterday",
},
];

const chartData = [
{ time: "8:00", count: 150 },
{ time: "9:00", count: 155 },
{ time: "10:00", count: 160 },
{ time: "11:00", count: 168 },
{ time: "12:00", count: 172 },
{ time: "13:00", count: 165 },
{ time: "14:00", count: 178 },
{ time: "15:00", count: 175 },
{ time: "16:00", count: 185 },
];

const genderData = [
  { name: "Male", value: 55 },
  { name: "Female", value: 45 },
];

const COLORS = ["#7FB3B0", "#BFE6E3"];

const trendData = [
  { time: "8:00", male: 180, female: 135 },
  { time: "9:00", male: 185, female: 138 },
  { time: "10:00", male: 190, female: 140 },
  { time: "11:00", male: 188, female: 142 },
  { time: "12:00", male: 195, female: 148 },
  { time: "13:00", male: 198, female: 150 },
  { time: "14:00", male: 190, female: 145 },
  { time: "15:00", male: 200, female: 152 },
  { time: "16:00", male: 205, female: 155 },
  { time: "17:00", male: 200, female: 150 },
  { time: "18:00", male: 210, female: 160 },
];
  return (
    <div className='bg-[#F7F8FA] w-full p-6 min-h-screen'>

    Here:: <DateSelector />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Overview</h1>

        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white text-sm">
          <FiCalendar />
          Today
        </button>
      </div>

      {/* Occupancy Title */}
      <h2 className="font-medium mb-3">Occupancy</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600">{item.title}</p>

            <h3 className="text-2xl font-semibold mt-2">{item.value}</h3>

            <div className="flex items-center gap-2 mt-3 text-sm">
              <span
                className={`font-medium ${
                  item.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.change}
              </span>
              <span className="text-gray-500">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Overall Occupancy</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="h-2 w-2 bg-teal-500 rounded-full"></span>
            Occupancy
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="time" label={{
    value: "Time",
    position: "insideBottom",
    offset: -5,
    style: { fill: "#555", fontSize: 16, fontWeight: 600 }
  }} />
              <YAxis label={{
    value: "Count",
    angle: -90,
    position: "insideLeft",
    style: { fill: "#555", fontSize: 16, fontWeight: 500 }
  }} />
              <Tooltip />
              <ReferenceLine
                x="16:00"
                stroke="red"
                strokeDasharray="4 4"
                label={{
                  value: "LIVE",
                  position: "top",
                  fill: "white",
                  backgroundColor: "red",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#2AA7A1"
                strokeWidth={2}
                dot={false}
                fillOpacity={0.2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

{/* Demographics */}
        <h2 className="text-lg font-semibold my-4">Demographics</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Donut Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-medium mb-4">Chart of Demographics</h3>

            <div className="flex justify-center relative">
              <PieChart width={220} height={220}>
                <Pie
                  data={genderData}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>

              <div className="text-center absolute mt-20">
                <p className="text-xs text-gray-500">Total Crowd</p>
                <p className="text-lg font-semibold">100%</p>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <img src={maleGraph} alt="male ICon" />
                <span className="text-sm">55% Males</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={femaleGraph} alt="female ICon" className="h-auto w-3" />

                <span className="text-sm">45% Females</span>
              </div>
            </div>
          </div>

          {/* Right Line Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Demographics Analysis</h3>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 bg-[#7FB3B0] rounded-full"></span> Male
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 bg-[#BFE6E3] rounded-full"></span> Female
                </div>
              </div>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis
                    dataKey="time"
                    label={{ value: "Time", position: "insideBottom", offset: -5 }}
                  />
                  <YAxis
                    label={{
                      value: "Count",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="male"
                    stroke="#7FB3B0"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="female"
                    stroke="#BFE6E3"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

    </div>
  )
}

export default DashboardPage