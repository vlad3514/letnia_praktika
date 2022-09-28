import io from "socket.io-client";
import Banner from "./components/banner/Banner";

import './App.css';

const socket = io.connect("http://localhost:4200/", {
  reconnection: true
});

function App() {
  return (
    <div className="App">
      <Banner socket={socket} />
    </div>
  );
}

export default App;
