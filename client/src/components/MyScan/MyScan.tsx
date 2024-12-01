import api from "@/lib/api";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";

// Updated interface to match the new schema
interface Scan {
  _id: string;
  userEmail: string;
  auraId: string;
  name: string;
  tool: string[];
  url: string;
  status: string;
  createdAt: string;
  __v: number;
}

const MyScan = () => {
  const [data, setData] = useState<Scan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    try {
      const res = await api.get('/scan/getscans');
      console.log(res.data);
      setData(res.data);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } else {
        console.error('An unknown error occurred');
        setError('An unexpected error occurred');
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading scans: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="font-messina-mono font-black text-4xl">My Scans</h1>
        <p className="my-4 text-gray-600">List of all the previous scans</p>
      </div>
      
      <div className="grid gap-4">
        {data.map((scan) => (
          <div 
            key={scan._id} 
            className="shadow-md rounded-lg p-4 border"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">Scan ID: {scan.auraId}</span>
              <span 
                className={`px-3 py-1 rounded-full text-sm ${
                  scan.status === 'Pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {scan.status}
              </span>
            </div>
            <div className="space-y-2">
              <p><strong>Scan Name:</strong> {scan.name}</p>
              <p><strong>URL:</strong> {scan.url}</p>
              <p><strong>Tools:</strong> {scan.tool.join(', ')}</p>
            </div>
            <div className="mt-4">
              <Link to={`/dashboard/myresult/${scan._id}`}>
                <Button
                  disabled={scan.status !== 'Completed'}
                  className="w-full py-2 rounded-md transition-colors"
                  variant="outline"
                >
                  View Results
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyScan;