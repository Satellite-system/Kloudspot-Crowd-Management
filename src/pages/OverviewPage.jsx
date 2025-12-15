import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import PaginationComponent from "../components/PaginationComponent";

export default function OverviewPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currPage, setcurrPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const { postApi, loading, error } = useApi();
  // const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const body = {
      siteId: "8bd0d580-fdac-44a4-a6e4-367253099c4e",
      fromUtc: "1765656000000",
      toUtc: "1765742399999",
      pageNumber: currPage,
      pageSize: ITEMS_PER_PAGE,
    };
    postApi("/analytics/entry-exit", body).then((res) => {
      setData(res.records);
      setTotalPages(res.totalPages);
    });
  }, [currPage]);

  const pageChangeHandler = (page) => {
    if (currPage === page) return;
    setcurrPage(page);
  };

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
              <tr key={row.personId} className="border-t">
                <td className="p-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-300" />
                  <span>{row.personName}</span>
                </td>
                <td className="text-gray-600">{row.gender}</td>
                <td>{row.entryUtc}</td>
                <td>{row.exitUtc || "-"}</td>
                <td className="text-gray-600">{row.dwellMinutes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <PaginationComponent
          currentPage={currPage}
          totalPages={totalPages}
          onPageChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}
