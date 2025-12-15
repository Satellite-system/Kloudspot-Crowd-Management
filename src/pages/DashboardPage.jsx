import React, { useEffect, useState } from "react";
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
  ReferenceLine,
} from "recharts";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker"; // Third-party library for the calendar UI
import { FiCalendar } from "react-icons/fi";
import maleGraph from "./../assets/icons/maleGraph.png";
import femaleGraph from "./../assets/icons/femaleGraph.png";
import DateSelector from "../components/DateSelector";
import { useApi } from "../hooks/useApi";
import { useDataCache } from "../context/DataCacheContext";
import { utcToLocalTime } from "../utils/utcMillHelper";
import {
  calculateGenderPercentage,
  getUtcDayRange,
} from "../utils/helperFunctions";
import { useGlobal } from "../context/GlobalContext";

function DashboardPage() {
  const { stateVal } = useGlobal();
  const [selectedDate, setSelectedDate] = useState(stateVal.date || new Date());
  const { getCache, setCache } = useDataCache();
  const { postApi } = useApi();
  const [demographic, setDemographic] = useState(null);
  const [occupancy, setOccupancy] = useState(null);
  const [stats, setStats] = useState([
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
  ]);

  const COLORS = ["#7FB3B0", "#BFE6E3"];

  useEffect(() => {
    if (!selectedDate) return;
    if (!stateVal?.selectedSite?.siteId) return;

    const utcInterval = getUtcDayRange(selectedDate);

    const body = {
      siteId: stateVal.selectedSite.siteId,
      fromUtc: utcInterval.fromUtc,
      toUtc: utcInterval.toUtc,
    };
    const dateKey = new Date(selectedDate).toISOString().split("T")[0];
    const DEMO_KEY = `DEMOGRAPHICS_${body.siteId}_${dateKey}`;
    const OCC_KEY = `OCCUPANCY_${body.siteId}_${dateKey}`;
    const CACHE_TTL = 15 * 60 * 1000;

    /* ---------- DEMOGRAPHICS ---------- */
    const cachedDemo = getCache(DEMO_KEY);

    if (cachedDemo && Date.now() - cachedDemo.timestamp < CACHE_TTL) {
      setDemographic(cachedDemo.data);
    } else {
      postApi("/analytics/demographics", body).then((res) => {
        if (res?.buckets?.length) {
          const genderPerc = calculateGenderPercentage(res.buckets);
          res.percentage = [
            { name: "Male", value: genderPerc.malePercentage },
            { name: "Female", value: genderPerc.femalePercentage },
          ];
        }

        setDemographic(res);
        setCache(DEMO_KEY, { data: res, timestamp: Date.now() });
      });
    }

    /* ---------- OCCUPANCY ---------- */
    const cachedOcc = getCache(OCC_KEY);

    if (cachedOcc && Date.now() - cachedOcc.timestamp < CACHE_TTL) {
      setOccupancy(cachedOcc.data);
    } else {
      postApi("/analytics/occupancy", body).then((res) => {
        setOccupancy(res);
        setCache(OCC_KEY, { data: res, timestamp: Date.now() });
      });
    }

    /* ---------- FOOTFALL ---------- */
    postApi("/analytics/footfall", body).then((res) => {
      setStats((prev) =>
        prev.map((item) =>
          item.title === "Today’s Footfall"
            ? { ...item, value: res.footfall }
            : item
        )
      );
    });
  }, [selectedDate, stateVal?.selectedSite?.siteId]);

  return (
    <div className="bg-[#F7F8FA] w-full p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Overview</h1>

        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
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

        {/* Occupancy Graph Chart */}
        {occupancy && occupancy.buckets.length > 0 && (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={occupancy.buckets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis
                  dataKey="utc"
                  tickFormatter={(value) => utcToLocalTime(value)}
                  label={{
                    value: "Time",
                    position: "insideBottom",
                    offset: -5,
                    style: { fill: "#555", fontSize: 16, fontWeight: 600 },
                  }}
                />
                <YAxis
                  label={{
                    value: "Count",
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "#555", fontSize: 16, fontWeight: 500 },
                  }}
                />
                <Tooltip />
                <ReferenceLine
                  x={occupancy.buckets[occupancy.buckets.length - 1].utc}
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
                  dataKey="avg"
                  stroke="#2AA7A1"
                  strokeWidth={2}
                  dot={false}
                  fillOpacity={0.2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Demographics */}
      <h2 className="text-lg font-semibold my-4">Demographics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Donut Chart */}
        {demographic &&
          demographic.percentage &&
          demographic.percentage.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-medium mb-4">Chart of Demographics</h3>

              <div className="flex justify-center relative">
                <PieChart width={220} height={220}>
                  <Pie
                    data={demographic.percentage}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {demographic.percentage.map((_, index) => (
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
                  <span className="text-sm">
                    {demographic.percentage[0].value}% Males
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={femaleGraph}
                    alt="female ICon"
                    className="h-auto w-3"
                  />

                  <span className="text-sm">
                    {demographic.percentage[1].value}% Females
                  </span>
                </div>
              </div>
            </div>
          )}

        {/* Right Two Line Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Demographics Analysis</h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 bg-[#7FB3B0] rounded-full"></span> Male
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 bg-[#BFE6E3] rounded-full"></span>{" "}
                Female
              </div>
            </div>
          </div>

          <div className="h-[300px]">
            {demographic && demographic.buckets.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demographic.buckets}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis
                    dataKey="utc"
                    tickFormatter={(value) => utcToLocalTime(value)}
                    label={{
                      value: "Time",
                      position: "insideBottom",
                      offset: -5,
                    }}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
