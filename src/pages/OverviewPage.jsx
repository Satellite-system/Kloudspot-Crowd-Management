import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

const data = [
  { name: "Alice Johnson", sex: "Female", entry: "11:05 AM", exit: "--", dwell: "--" },
  { name: "Brian Smith", sex: "Male", entry: "11:03 AM", exit: "--", dwell: "--" },
  { name: "Catherine Lee", sex: "Female", entry: "11:00 AM", exit: "--", dwell: "--" },
  { name: "David Brown", sex: "Male", entry: "10:50 AM", exit: "11:10 AM", dwell: "00:20" },
  { name: "Eva White", sex: "Female", entry: "11:20 AM", exit: "11:30 AM", dwell: "00:10" },
  { name: "Frank Green", sex: "Male", entry: "11:50 AM", exit: "12:10 AM", dwell: "00:20" },
  { name: "Grace Taylor", sex: "Female", entry: "10:50 AM", exit: "11:10 AM", dwell: "00:20" },
  { name: "Henry Wilson", sex: "Male", entry: "10:50 AM", exit: "11:10 AM", dwell: "00:20" },
  { name: "Isabella Martinez", sex: "Female", entry: "10:50 AM", exit: "11:10 AM", dwell: "00:20" },
  { name: "Jack Thompson", sex: "Male", entry: "10:50 AM", exit: "11:10 AM", dwell: "00:20" },
  { name: "Katherine Anderson", sex: "Female", entry: "10:50 AM", exit: "11:10 AM", dwell: "00:20" },
];

const ITEMS_PER_PAGE = 6;

export default function OverviewPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedData = data.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 bg-[#F8F9FB] min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Overview</h1>
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white text-sm">
          <FiCalendar />
          Today
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th>Sex</th>
              <th>Entry</th>
              <th>Exit</th>
              <th>Dwell Time</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-300" />
                  <span>{row.name}</span>
                </td>
                <td className="text-gray-600">{row.sex}</td>
                <td>{row.entry}</td>
                <td>{row.exit}</td>
                <td className="text-gray-600">{row.dwell}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 p-4">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-1 disabled:opacity-40"
          >
            <FiChevronLeft />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-teal-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-1 disabled:opacity-40"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
