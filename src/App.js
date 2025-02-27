import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import songs from './mockDataSongs';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <TrackList playlist={songs}/>
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
