import { Button } from "./components/ui/button";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        AURA
      </h1>
      <Button>Submit</Button>
      <div className="font-messina font-light text-lg">
        This is Messina Sans Light.
      </div>

      <div className="font-messina font-bold text-xl">
        This is Messina Sans Bold.
      </div>

      <div className="font-messina-mono font-black text-base">
        This is Messina Sans Mono Black.
      </div>

    </div>
  )
}

export default App;
