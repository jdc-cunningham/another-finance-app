const apiBase = 'http://192.168.1.144:5045'; // use an env file, enum, etc...
const apiPathGetNetWorth = `${apiBase}/get-latest-net-worth`;
const apiPathGetBills = `${apiBase}/get-bills`;
const apiPathGetCards = `${apiBase}/get-cards`;

export const getNetWorth = () => {
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

export const getBills = () => {
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

export const getCards = () => {
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

export const consolidateBills = (billsData, setUpdatedBills) => {
  try {
    const bills = billsData[0];
    const netWorthPartial = billsData[1];
    const cardMinDues = netWorthPartial[1];
    const accountNames = netWorthPartial[4];

    const updatedBills = [];
    
    bills.forEach(bill => {
      const name = bill[0];
      const amount = parseFloat(bill[2].replace('$', ''));
      const frequency = bill[4];
      
      if (amount > 0) {
        if (accountNames.includes(name)) {
          updatedBills.push([
            bill[0],
            bill[1],
            cardMinDues[accountNames.indexOf(name)],
            bill[3],
            bill[4]
          ]);
        } else {
          updatedBills.push(bill);
        }

        if (frequency === 'bi-weekly') {
          updatedBills.push([
            bill[0],
            bill[1],
            bill[2],
            15, // push to middle of month
            bill[4]
          ]);
        }
      }
    });

    setUpdatedBills(updatedBills);
  } catch (err) {
    console.error('Error consolidating bills');
  }
}

// https://stackoverflow.com/a/44288663/2710227
export const sortArrByIndex = (arr, arrIndex) => {
  const sortedArr = arr.sort((a,b) => a[3] - b[3]).map(arr => arr);
  return sortedArr;
}
