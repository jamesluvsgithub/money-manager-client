import Footer from './Footer';
import EntriesDisplay from './EntriesDisplay';
import AddEntry from './AddEntry';
import AddGoal from './AddGoal';
import SearchEntry from './SearchEntry';
import apiRequest from './apiRequest';
import React, { useState, useEffect } from 'react';
import GoalsDisplay from './GoalsDisplay';

function App() {
  const [isLoading, setIsloading] = useState(true);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);

  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({name:'', amount:0, date:0});
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({name:'Max Total Expenses', unit:'days'});

  const [search, setSearch] = useState('');
  const [searchMax, setSearchMax] = useState(Infinity);
  const [searchMin, setSearchMin] = useState(0);
  const [fetchError, setFetchError] = useState(null);
  const [fetchGError, setFetchGError] = useState(null);
  
  const [selectedFilter, setSelectedFilter] = useState('name');
  const [fromYear, setFromYear] = useState(0);
  const [fromMonth, setFromMonth] = useState(0);
  const [fromDay, setFromDay] = useState(0);
  const [ToYear, setToYear] = useState(9999);
  const [ToMonth, setToMonth] = useState(99);
  const [ToDay, setToDay] = useState(99);
  const [viewingMode, setViewingMode] = useState('expenses');

  const API_URL_ENTRIES = process.env.REACT_APP_API_URL_ENTRIES;
  const API_URL_GOALS = process.env.REACT_APP_API_URL_GOALS;
/////////////////////////// expenses ///////////////////////////

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch(API_URL_ENTRIES);
        if (!response.ok) throw Error('Did not receive expected expenses data =(');
        const listEntries = await response.json();
        setEntries(listEntries);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
        console.error('error fetching entries:', err);
      } finally {
        setIsloading(false);
      }
    }

    fetchEntries();
  }, [])

  const addEntry = async (entry) => {
    const id = entries.length ? entries[entries.length - 1].id + 1 : 1 ;
    const myNewEntry = {id:id, name:entry.name, amount:entry.amount, date:entry.date};
    const listEntries = [...entries, myNewEntry];
    setEntries(listEntries);

    const postOptions = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewEntry)
    }
    const result = await apiRequest(API_URL_ENTRIES, postOptions);
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    const listEntries = entries.filter((entry) => entry._id !== id)
    setEntries(listEntries);

    const deleteOptions = { method:'DELETE' };
    const reqUrl = `${API_URL_ENTRIES}${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEntry.name || !newEntry.amount) return;
    addEntry(newEntry);
    setNewEntry({name:'', amount:0});
  }

/////////////////////////// goals //////////////////////////////

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(API_URL_GOALS);
        if (!response.ok) throw Error('Did not receive expected goals data =(');
        const listGoals = await response.json();
        setGoals(listGoals);
        setFetchGError(null);
      } catch (err) {
        setFetchGError(err.message);
      } finally {
        setIsLoadingGoals(false);
      }
    }

    fetchGoals();
  }, [])

  const addGoal = async (goal) => {
    const getExpiryDate = (units, unit) => {
      let x;
      if (unit === 'days') x = 1;
      else if (unit === 'weeks') x = 7;
      else if (unit === 'months') x = 31;
      const daysToAdd = units * x;
      const date = new Date();
      date.setDate(date.getDate() + daysToAdd);
      const newDateInt = (date.getFullYear() * 10000) + ((date.getMonth() + 1) * 100) + date.getDate();
      return newDateInt;
    }
    const expiryDate = getExpiryDate(goal.units, goal.unit);

    const id = goals.length ? goals[goals.length - 1].id + 1 : 1 ;
    const myNewGoal = {id:id, name:goal.name, amount:goal.amount, units:goal.units, unit:goal.unit, expiryDate:expiryDate};

    const listGoals = [...goals, myNewGoal];
    setGoals(listGoals);

    let options;
    const isThereIsMaxTotal = goals.some(goal => goal.name === 'Max Total Expenses');
    const isThereSingle = goals.some(goal => goal.name === 'Max Single Expense');
    if (isThereIsMaxTotal && myNewGoal.name === 'Max Total Expenses'){
      const maxTotalExpensesObj = goals.find(goal => goal.name === 'Max Total Expenses');
      handleGoalDelete(maxTotalExpensesObj._id);
    } else if (isThereSingle && myNewGoal.name === 'Max Single Expense') {
      const maxSingleExpenseObj = goals.find(goal => goal.name === 'Max Single Expense');
      handleGoalDelete(maxSingleExpenseObj._id);
    }
    options = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewGoal)
    };

    console.log(myNewGoal);
    const result = await apiRequest(API_URL_GOALS, options);
    if (result) setFetchGError(result);
  }

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    console.log(newGoal);
    addGoal(newGoal);
    setNewGoal({ name:'' });
  }

  const handleGoalDelete = async (id) => {
    const listGoals = goals.filter((goal) => goal._id !== id)
    setGoals(listGoals);

    const deleteOptions = { method:'DELETE' };
    const reqUrl = `${API_URL_GOALS}${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchGError(result);
  }

//////////////////// searching expenses ///////////////////////

  const fromDate = () => {
    const year = fromYear;
    const month = (fromMonth).toString().padStart(2, '0');
    const day = fromDay.toString().padStart(2, '0');
    return parseInt(`${year}${month}${day}`);
  }
  const ToDate = () => {
    const year = ToYear;
    const month = (ToMonth).toString().padStart(2, '0');
    const day = ToDay.toString().padStart(2, '0');
    return parseInt(`${year}${month}${day}`);
  }

  const checkAmount = (entry) => {
    return entry.amount >= searchMin && entry.amount <= searchMax;
  }

  const checkDate = (entry) => {
    return entry.date >= fromDate() && entry.date <= ToDate();
  }

////////////////////////////////////////////////////////////////
  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return parseInt(`${year}${month}${day}`);
  }

  const filteredEntries = entries.filter(entry => 
    ((entry.name).toLowerCase()).includes(search.toLowerCase()) && 
    checkAmount(entry) && 
    checkDate(entry)
  );


  return (
    <>
      <main style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'rgb(53, 50, 85)' }}>
          <AddEntry
            newEntry={newEntry}
            setNewEntry={setNewEntry}
            handleSubmit={handleSubmit}
            viewingMode={viewingMode}
            getDate={getDate}
          />
    
          <SearchEntry
            setSearch={setSearch}
            setSearchMax={setSearchMax}
            setSearchMin={setSearchMin}
            searchMax={searchMax}
            searchMin={searchMin}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setFromYear={setFromYear}
            setFromMonth={setFromMonth}
            setFromDay={setFromDay}
            setToYear={setToYear}
            setToMonth={setToMonth}
            setToDay={setToDay}
            viewingMode={viewingMode}
          />
    
          <>{viewingMode === 'expenses' && <Footer entries={filteredEntries} />}</>
          <AddGoal
            newGoal={newGoal}
            setNewGoal={setNewGoal}
            handleGoalSubmit={handleGoalSubmit}
            viewingMode={viewingMode}
            setViewingMode={setViewingMode}
          />
          <>{viewingMode === 'goals' && <Footer entries={filteredEntries} />}</>
    
          {isLoadingGoals && <p className='goal' style={{ color: 'white', marginLeft: '1.5vh', marginTop: '1.5vh' }}>Loading Goals...</p>}
          {fetchGError && <p style={{ color: 'red', marginLeft: '1.5vh', marginTop: '1.5vh' }}>{`Error: ${fetchGError}`}</p>}
          {!fetchGError && !isLoadingGoals &&<div style={{ maxHeight: '55.5vh', overflowY: 'auto' }}><GoalsDisplay goals={goals} handleGoalDelete={handleGoalDelete} getDate={getDate}/> </div>}
        </div>
    
        <main>
          {isLoading && <p className='entry' style={{ color: 'white', marginLeft: '1.5vh', marginTop: '1.5vh' }}>Loading Expenses...</p>}
          {fetchError && <p style={{ color: 'red', marginLeft: '1.5vh', marginTop: '1.5vh' }}>{`Error: ${fetchError}`}</p>}
          {!fetchError && !isLoading && <EntriesDisplay entries={filteredEntries} handleDelete={handleDelete} goals={goals} getDate={getDate}/>}
        </main>
      </main>
    </>
  );
  
}

export default App;
