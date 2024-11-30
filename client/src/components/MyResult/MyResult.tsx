import React, { useState } from 'react';
import data from '../../assets/test.json'

// Define types for the JSON structure
interface Instance {
  uri: string;
  method: string;
  param: string;
  attack: string;
  evidence: string;
  otherinfo: string;
}

interface Alert {
  pluginid: string;
  alert: string;
  riskdesc: string;
  desc: string;
  instances: Instance[];
}

interface Site {
  alerts: Alert[];
}

interface AlertData {
  site: Site[];
}

const AlertTable: React.FC = () => {
  // Type the data as per the JSON structure
  const alertData: AlertData = data as AlertData;
  const alerts: Alert[] = alertData.site[0].alerts;

  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (index: number) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Alerts Table</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2 text-left">Alert Name</th>
            <th className="border border-gray-300 p-2 text-left">Risk</th>
            <th className="border border-gray-300 p-2 text-left">Description</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, index) => (
            <React.Fragment key={alert.pluginid}>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{alert.alert}</td>
                <td className="border border-gray-300 p-2">{alert.riskdesc}</td>
                <td className="border border-gray-300 p-2 truncate">{alert.desc}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => toggleRow(index)}
                  >
                    {expandedRows[index] ? 'Hide Details' : 'View Details'}
                  </button>
                </td>
              </tr>
              {expandedRows[index] && (
                <tr className="bg-gray-50">
                  <td colSpan={4} className="border border-gray-300 p-4">
                    <h3 className="text-lg font-semibold">Details:</h3>
                    <p className="text-gray-700">{alert.desc}</p>
                    <h4 className="text-md font-medium mt-2">Instances:</h4>
                    <ul className="list-disc ml-5">
                      {alert.instances.map((instance, i) => (
                        <li key={i} className="text-gray-600">
                          {instance.uri} ({instance.method})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertTable;
