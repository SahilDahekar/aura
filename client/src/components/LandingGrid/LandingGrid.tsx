const LandingGrid = () => {
  return (
    <div className="max-w-screen-xl mx-auto my-20">
    <h3 className="uppercase font-messina-mono font-bold text-5xl text-primary">AURA Platform Enhances <br />Your Cybersecurity Posture</h3>
    <p className="text-white text-xl text-justify max-w-5xl my-8">Intelligent vulnerability management and risk orchestration across multiple security tools ensures that the right security data, in the right context, is provisioned to the right decision-makers for timely risk mitigation. Reevaluating your security infrastructure? AURA's unified platform helps migrate between tools and enables cost-effective vulnerability management.</p>
    <div className="grid grid-cols-2 grid-rows-2 text-white place-content-center">
        <div className="border border-white flex justify-evenly gap-6 px-8 py-10">
        <div className="h-16 w-16 bg-muted">

        </div>
        <div className="">
            <h4 className="text-[#87d9da] font-messina-mono font-black uppercase text-3xl mb-4">Reduce Security Complexities</h4>
            <p>Eliminate redundant vulnerability assessments to dramatically reduce security overhead</p>
        </div>
        </div>
        <div className="border border-white flex justify-evenly gap-6 px-12 py-10">
        <div className="h-16 w-16 bg-muted">

        </div>
        <div className="">
            <h4 className="text-[#5f65f5] font-messina-mono font-black uppercase text-3xl mb-4">Optimize Security Spending</h4>
            <p>Confidently manage security tool investments without compromising on threat visibility</p>
        </div>
        </div>
        <div className="border border-white flex justify-evenly gap-6 px-12 py-10">
        <div className="h-16 w-16 bg-muted">

        </div>
        <div className="">
            <h4 className="text-[#ff615c] font-messina-mono font-black uppercase text-3xl mb-4">Accelerate Threat Response</h4>
            <p>Get the comprehensive insights you need to solve security problems quicker</p>
        </div>
        </div>
        <div className="border border-white flex justify-evenly gap-6 px-12 py-10">
        <div className="h-16 w-16 bg-muted">

        </div>
        <div className="">
            <h4 className="text-[#5f65f5] font-messina-mono font-black uppercase text-3xl mb-4">Modernize Risk Management</h4>
            <p>Streamlined vulnerability tracking, intelligent risk scoring, and comprehensive governance</p>
        </div>
        </div>
    </div>
    </div>
  )
}

export default LandingGrid;