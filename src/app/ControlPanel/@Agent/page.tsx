

export default async function AgentSlot() {
  return (
    <div className ="bg-blue-highlight rounded-lg p-8" style={{ display: "inline-block" }}>
  
  <div className="bg-blue-highlight rounded-lg">
    <h1 className="text-4xl font-bold text-center ">Agent</h1>
  </div>
  <div className="grid grid-cols-5 gap-x-16 gap-y-2 bg-blue-highlight">
    {[...Array(20)].map((_, index) => (
      <div key={index} className="rounded-lg flex flex-col items-center justify-center">
        <div>
          <img
            src={index % 2 === 0 ? "images/AgentBlue.svg" : "images/AgentWhite.svg"}
            alt="Agent"
            className="w-10 h-auto mx-auto"
          />
          <p className={`text-center text-sm ${index % 2 === 0 ? "text-figma-figma1" : "text-white"}`}>
            #12DAC
          </p>
        </div>
      </div>
    ))}
  </div>

</div>
  );
}