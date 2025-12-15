import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import PaginationComponent from "../components/PaginationComponent";
import { useGlobal } from "../context/GlobalContext";
import DateSelector from "../components/DateSelector";
import { getUtcDayRange } from "../utils/helperFunctions";
import { useDataCache } from "../context/DataCacheContext";

export default function OverviewPage() {
  const { stateVal } = useGlobal();
  const { getCache, setCache } = useDataCache();

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currPage, setcurrPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(stateVal.date || new Date());

  const ITEMS_PER_PAGE = 10;
  const { postApi, loading, error } = useApi();

  const getoverviewData = (page) => {
    const utcInterval = getUtcDayRange(selectedDate);

    const body = {
      siteId: stateVal.selectedSite.siteId,
      fromUtc: utcInterval.fromUtc,
      toUtc: utcInterval.toUtc,
      pageNumber: page,
      pageSize: ITEMS_PER_PAGE,
    };

    const dateKey = new Date(selectedDate).toISOString().split("T")[0];

    const CACHE_KEY = `OVERVIEW_${body.siteId}_${dateKey}_PAGE_${currPage}`;
    const CACHE_TTL = 15 * 60 * 1000;

    const cached = getCache(CACHE_KEY);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log("Getting from cache", CACHE_KEY);
      setData(cached.data.records);
      setTotalPages(cached.data.totalPages);
    } else {
      postApi("/analytics/entry-exit", body).then((res) => {
        setData(res.records);
        setTotalPages(res.totalPages);

        setCache(CACHE_KEY, { data: res, timestamp: Date.now() });
      });
    }
  };

  useEffect(() => {
    if (!selectedDate) return;
    if (!stateVal?.selectedSite?.siteId) return;

    getoverviewData(currPage);
  }, [currPage, selectedDate]);

  useEffect(() => {
    setcurrPage(1);
  }, [stateVal?.selectedSite?.siteId]);

  const pageChangeHandler = (page) => {
    if (currPage === page) return;
    setcurrPage(page);
  };

  return (
    <div className="p-6 bg-[#F8F9FB] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Overview</h1>

        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
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
            {data.map((row, idx) => (
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
