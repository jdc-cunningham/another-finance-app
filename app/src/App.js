import { useState, useEffect } from 'react';
import { getNetWorth, getBills, getCards, consolidateBills, sortArrByIndex } from './methods';
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

const renderBills = (bills) => (
  <div className="App__bills">
    <div className="App__bills-title">
      <h2>Bills</h2>
    </div>
    <table className="App__bills-table">
      <tr className="App__bills-header">
        <th>Bill Name</th>
        <th>Amount</th>
        <th>Due Date</th>
      </tr>
      {sortArrByIndex(bills, 3).map(bill => (
        <tr className="App__bill">
          <td>{bill[0]}</td>
          <td>{bill[2]}</td>
          <td>{bill[3]}</td>
        </tr>  
      ))}
    </table>
  </div>
)

function App() {
  const [appData, setAppData] = useState({
    netWorth: {},
    cards: {},
    bills: {}
  });

  const [updatedBills, setUpdatedBills] = useState([]);

  useEffect(() => {
    if (appData?.bills?.length) {
      // bills API was updated in the past to include part of networth
      consolidateBills(appData.bills, setUpdatedBills);
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
      {(updatedBills.length > 0) && renderBills(updatedBills)}
    </div>
  );
}

export default App;
