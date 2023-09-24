import { useState, useEffect } from 'react';
import { getNetWorth, getBills, getCards, consolidateBills } from './methods';
import './App.css';

const getData = async (setAppData) => {
  const netWorth = await getNetWorth();
  const bills = await getBills();
  const cards = await getCards();

  console.log(bills);

  setAppData({
    netWorth: netWorth.err ? {} : netWorth.data,
    bills: bills.err ? [] : bills.data,
    cards: cards.err ? [] : cards.data
  });
}

function App() {
  const [appData, setAppData] = useState({
    netWorth: {},
    cards: {},
    bills: {}
  });

  useEffect(() => {
    if (appData?.bills?.length) {
      // bills API was updated in the past to include part of networth
      consolidateBills(appData.bills);
    }
  }, [appData]);

  useEffect(() => {
    if (!appData?.bills.length) {
      console.log('call');
      getData(setAppData);
    }
  }, []);

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
