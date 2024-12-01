import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ResultTable from '../ResultTable/ResultTable';
import api from '@/lib/api';

interface Alert {
  name: string;
  riskcode: string;
  count: string;
  desc: string;
}

interface Site {
  '@name': string;
  alerts: Alert[];
}

interface ResultData {
  site: Site[];
}

const MyResult = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  
  const [data, setData] = useState<ResultData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    // Ensure id exists before making the request
    if (!id) return;

    try {
      setIsLoading(true);
      const res = await api.post('result/getfile', { scanId: id });
      console.log(res.data);
      setData(res.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch scan results');
      setData({ site: [] });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]); // Depend on id to refetch if route changes

  if (isLoading) {
    return (
      <div>
        <h1 className="font-messina-mono font-black text-4xl">My Results</h1>
        <p className="my-4">Loading scan results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="font-messina-mono font-black text-4xl">My Results</h1>
        <p className="text-destructive my-4">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="font-messina-mono font-black text-4xl">My Results</h1>
        <p className="my-4">See Result for your latest scan</p>
      </div>
      {data && data.site.length > 0 ? (
        // @ts-ignore
        <ResultTable data={data} />
      ) : (
        <p className="">No results available for this scan.</p>
      )}
    </div>
  )
}

export default MyResult;
