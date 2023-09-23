import { useState, useEffect } from 'react';
import './App.css';

const apiBase = 'http://192.168.1.144:5045'; // use an env file, enum, etc...
const apiPathGetNetWorth = `${apiBase}/get-latest-net-worth`;
const apiPathGetBills = `${apiBase}/get-bills`;
const apiPathGetCards = `${apiBase}/get-cards`;

const getNetWorth = () => {
  return new Promise (async (resolve, reject) => {
    try {
      const response = await fetch(apiPathGetNetWorth);
      const netWorth = await response.json();
      console.log('net worth', netWorth);
      resolve(netWorth);
    } catch (err) {
      reject(err);
    }
  });
}

const getBills = () => {
  return new Promise (async (resolve, reject) => {
    try {
      const response = await fetch(apiPathGetBills);
      const bills = await response.json();
      console.log('bills', bills);
      resolve(bills);
    } catch (err) {
      reject(err);
    }
  });
}

const getCards = async () => {
  return new Promise (async (resolve, reject) => {
    try {
      const response = await fetch(apiPathGetCards);
      const cards = await response.json();
      console.log('cards', cards);
      resolve(cards);
    } catch (err) {
      reject(err);
    }
  });
}

const filterVals = async () => {
  const netWorth = await getNetWorth();
  const bills = await getBills();
  const cards = await getCards();
}

function App() {
  const [appData, setAppData] = useState({
    netWorth: {},
    cards: {},
    bills: {},
  });

  useEffect(() => {
    filterVals();
  }, []);

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
