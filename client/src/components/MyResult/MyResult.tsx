import { useEffect, useState } from 'react';
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
  const [data, setData] = useState<ResultData | undefined>(undefined);

  async function fetchData() {
    try {
      const res = await api.get('result/getfile');
      console.log(res.data);
      setData(res.data.outputJSON);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Optionally set data to an empty state or handle the error
      setData({ site: [] });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h1 className="font-messina-mono font-black text-4xl">My Results</h1>
        <p className="my-4">See Result for your latest scan</p>
      </div>
      {data && <ResultTable data={data} />}
    </div>
  )
}

export default MyResult
