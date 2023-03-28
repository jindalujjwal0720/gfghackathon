import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { TransactionTypes } from "../../../data/models/transaction_model";
import { getTransactions } from "../../../data/providers/transactions_provider";
import { getDate, getTime } from "../../../utility/helper";
import { Loading } from "../Empty/Loading";
import styles from "./finances.module.css";

export const Finances = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [monthlyTransactionAmounts, setMonthlyTransactionAmounts] = useState(
    []
  );
  const [patientsMap, setPatientsMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    console.log(query);

    const conditions = (tran) => {
      return (
        tran.id.toLowerCase().indexOf(query) > -1 ||
        patientsMap[tran.patientID].name.toLowerCase().indexOf(query) > -1 ||
        tran.note.toLowerCase().indexOf(query) > -1 ||
        getDate(tran.timestamp).toLowerCase().indexOf(query) > -1 ||
        tran.amount.toString().indexOf(query) > -1
      );
    };

    if (query.length > 1) {
      console.log(allTransactions);
      console.log(transactions);
      let filteredResults = [];
      allTransactions.forEach(([date, trans]) => {
        let tempTrans = trans.filter((tran) => conditions(tran));
        if (tempTrans.length > 0) {
          filteredResults.push([date, tempTrans]);
        }
      });
      setTransactions(filteredResults);
    } else {
      setTransactions(allTransactions);
    }
  };

  useEffect(() => {
    getTransactions().then(([trans, patsMap]) => {
      setAllTransactions(groupByDates(trans));
      setTransactions(groupByDates(trans));
      setMonthlyTransactionAmounts(monthlyTotal(trans));
      setPatientsMap(patsMap);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1 className={styles.heading}>Finances</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.transactionsLayout}>
          <div className={styles.transactionsContainer}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <h2 className={styles.subheading}>Transactions History</h2>
              <input
                type="search"
                className={styles.searchBar}
                placeholder="Search Transaction"
                id="transaction-search"
                onChange={(e) => handleChange(e)}
              ></input>
              <label for="transaction-search" className={styles.searchIcon}>
                <IoSearch />
              </label>
            </div>
            <div className={styles.transactionsContainerScrollable}>
              {transactions.map((category) => (
                <div className={styles.category}>
                  <div className={styles.separator}>
                    <span>{category[0]}</span>
                  </div>
                  {category[1].map((transaction) => (
                    <div className={styles.transactionsContent}>
                      <div className={styles.transactionTimeAndID}>
                        <p>{getTime(transaction.timestamp)}</p>
                        <p>id: {transaction.id}</p>
                      </div>
                      <div className={styles.transactionNoteAndAmount}>
                        <p className={styles.transactionNote}>
                          {transaction.note}
                        </p>
                        <p
                          className={styles.transactionAmount}
                          style={{
                            color:
                              transaction.type === TransactionTypes.BONUS
                                ? "#f17105"
                                : "",
                          }}
                        >
                          {transaction.type === TransactionTypes.BONUS
                            ? "B "
                            : "₹ "}
                          {transaction.amount}
                        </p>
                      </div>
                      {transaction.type !== TransactionTypes.BONUS ? (
                        <div className={styles.patientTile}>
                          <img
                            src={
                              patientsMap[transaction.patientID].profilePicURL
                            }
                            alt="dp"
                            className={styles.patientTileImage}
                          ></img>
                          <div className={styles.patientNameEmail}>
                            <p className={styles.patietName}>
                              {patientsMap[transaction.patientID].name}
                            </p>
                            <p className={styles.patientEmail}>
                              {patientsMap[transaction.patientID].email}
                            </p>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.monthlyTransactionsContainer}>
            <h2 className={styles.subheading}>Monthly</h2>
            <div className={styles.monthlyTransactionsContent}>
              {monthlyTransactionAmounts.map((monthlyAmount) => (
                <div className={styles.monthlyAmountTile}>
                  <p className={styles.monthYear}>{monthlyAmount[0]}</p>
                  <div className={styles.monthlyAmounts}>
                    <div className={styles.monthlyAmountContainer}>
                      <span>Amount</span>
                      <p className={styles.monthlyAmount}>
                        ₹ {monthlyAmount[1].basic}
                      </p>
                    </div>
                    <div className={styles.monthlyBonusContainer}>
                      <span>Bonus</span>
                      <p className={styles.monthlyBonus}>
                        ₹ {monthlyAmount[1].bonus}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const groupByDates = (transactions) => {
  let resultObject = {};
  transactions.forEach((element) => {
    let key = getDate(element.timestamp);
    if (resultObject.hasOwnProperty(key)) {
      resultObject[key].push(element);
    } else {
      resultObject[key] = [element];
    }
  });
  let result = [];
  for (let key of Object.keys(resultObject)) {
    result.push([key, resultObject[key]]);
  }
  result.sort((a, b) => b[1].timestamp - a[1].timestamp);
  return result;
};

const getMonthYear = (timestamp) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date(Number(timestamp));
  return `${month[d.getMonth()]}, ${d.getFullYear()}`;
};

const monthlyTotal = (transactions) => {
  let resultObject = {};
  transactions.forEach((element) => {
    let key = getMonthYear(element.timestamp);
    if (resultObject.hasOwnProperty(key)) {
      resultObject[key].push(element);
    } else {
      resultObject[key] = [element];
    }
  });
  let result = [];
  for (let key of Object.keys(resultObject)) {
    result.push([key, resultObject[key]]);
  }
  result.sort((a, b) => b[1].timestamp - a[1].timestamp);
  for (let i in result) {
    let sum = {
      bonus: 0,
      basic: 0,
    };
    result[i][1].forEach((e) => {
      if (e.type === TransactionTypes.BONUS) {
        sum.bonus += e.amount;
      } else {
        sum.basic += e.amount;
      }
    });
    result[i] = [result[i][0], sum];
  }
  return result;
};
