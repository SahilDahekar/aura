import data from '../../assets/test.json'
import ResultTable from '../ResultTable/ResultTable';

const MyResult = () => {
  return (
    <div>
      <div>
          <h1 className="font-messina-mono font-black text-4xl">My Results</h1>
          <p className="my-4">See Result for your latest scan</p>
      </div>
      <ResultTable data={data} />
    </div>
  )
}

export default MyResult
