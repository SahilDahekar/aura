import MultiPartForm from "../MultiPartForm/MultiPartForm"

const NewScan = () => {
  return (
    <div>
        <div>
            <h1 className="font-messina-mono font-black text-4xl">New Scan</h1>
            <p className="my-4">Enter details to start your new scan</p>
        </div>
        <div>
            <MultiPartForm />
        </div>
    </div>
  )
}

export default NewScan