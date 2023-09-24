import { useState, useEffect } from 'react';
import {
  getNetWorth, getBills, getCards, consolidateBills,
  sortArrByIndex, addCurrencySymbol
} from './methods';
import './App.css';

const currentDate = new Date().getDate();

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

const renderBills = (bills) => {
  let total = 0;
  let unpaid = 0;

  return (
    <div className="App__bills">
      <div className="App__bills-title">
        <h2>Bills</h2>
      </div>
      <table className="App__bills-table">
        <thead>
          <tr className="App__bills-header">
            <th>Bill Name</th>
            <th>Amount</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {sortArrByIndex(bills, 3).map((bill, index) => {
            const isUpcoming = bill[3] >= currentDate;
            const amount = parseFloat(bill[2].replace('$', ''));

            total += amount;

            if (isUpcoming) {
              unpaid += amount;
            }

            return (
              <tr key={index} className={`App__bill ${isUpcoming ? 'upcoming' : ''}`}>
                <td>{bill[0]}</td>
                <td>{addCurrencySymbol(bill[2])}</td>
                <td>{bill[3]}</td>
              </tr>
            );
          })}

          <tr className="App__bills-total">
            <td>Total</td>
            <td>${total.toFixed(2)}</td>
            <td></td>
          </tr>

          <tr>
            <td>Unpaid</td>
            <td>${unpaid.toFixed(2)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

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
