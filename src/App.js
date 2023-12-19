import appleLogo from './assets/apple.svg';
import bananaLogo from './assets/banana.png';
import blueberryLogo from './assets/blueberry.png';
import './App.css';
import Dropdown from './Dropdown';

const options = [
  { image: appleLogo, label: "Apple", value: 'apple' },
  { image: bananaLogo, label: "Banana", value: 'banana' },
  { image: blueberryLogo, label: "Blueberry", value: 'blueberry' },
]
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dropdown
          placeholder="Choose a fruit"
          options={options}
          onChange={() => {}}
        />

      </header>
    </div>
  );
}

export default App;
