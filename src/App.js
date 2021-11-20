import axios from "axios";
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const client_id = "c6f612100e814fe08fdc85c1f6070adb";
  const fetchUrl = `https://api.spotify.com/v1/search?type=album&include_external=audio`;
  
  const fetchAlbums = () => {
    axios.get(fetchAlbums)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
