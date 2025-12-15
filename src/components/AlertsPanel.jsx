import { MapPin } from "lucide-react";
import { useState } from "react";
import { FiX } from "react-icons/fi";

function AlertCard({ alert, alertSelected, setAlertSelected }) {
  const severityStyles = {
    High: "bg-[#B42018] text-white",
    Medium: "bg-[#FF9900] text-white",
    Low: "bg-[#00AB7B] text-white",
  };

  return (
    <div
      className={`border rounded-xl p-4 flex justify-between cursor-pointer items-center ${
        alert.id===alertSelected.id ? "bg-[#CEF2F1] border-[#009490]" : "bg-white hover:bg-teal-50"
      }`} onClick={()=> setAlertSelected(alert)}
    >
      {/* Left Content */}
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-500">
          {alert.date} &nbsp; {alert.time}
        </span>

        <span className="font-semibold text-gray-800">
          {alert.name} Entered
        </span>

        <div className="flex items-center gap-1 text-sm text-gray-600">
          {/* Pin Icon (Red) */}
            <MapPin className="w-4 h-4 text-black-500" />
          <span>{alert.zone}</span>
        </div>
      </div>

      {/* Severity Badge */}
      <span
        className={`px-3 py-1 rounded-md text-xs font-medium ${
          severityStyles[alert.severity]
        }`}
      >
        {alert.severity}
      </span>
    </div>
  );
}


export default function AlertsPanel({setShow}) {
  const alerts = [
    {
      id: 1,
      date: "March 03 2025",
      time: "10:12",
      name: "Ahmad",
      zone: "Zone A",
      severity: "High",
      highlight: true,
    },
    {
      id: 2,
      date: "March 03 2025",
      time: "10:12",
      name: "Mathew",
      zone: "Zone A",
      severity: "Medium",
    },
    {
      id: 3,
      date: "March 03 2025",
      time: "10:12",
      name: "Rony",
      zone: "Zone B",
      severity: "High",
    },
    {
      id: 4,
      date: "March 03 2025",
      time: "10:12",
      name: "Rony",
      zone: "Zone B",
      severity: "Low",
    },
    {
      id: 5,
      date: "March 03 2025",
      time: "10:12",
      name: "Rony",
      zone: "Zone B",
      severity: "Low",
    },
  ];

  const [alertSelected, setAlertSelected] = useState(alerts[0])

  return (
    <div className="absolute w-[360px] max-h-[70vh] bg-white rounded-xl shadow-xl border flex flex-col top-0 -right-10 z-10">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Alerts</h2>
        <FiX className="cursor-pointer text-gray-500 hover:text-black" onClick={()=> setShow(false)} />
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} alertSelected={alertSelected} setAlertSelected={setAlertSelected} />
        ))}
      </div>
    </div>
  );
}
