import { useRef } from "react";

const AddEntry = ({ newEntry, setNewEntry, handleSubmit, viewingMode, getDate }) => {
  const inputRef = useRef();

  return (
      <form style={{display: viewingMode === 'expenses' ? 'block' : 'none'}} className="addForm" onSubmit={handleSubmit}>
        <label htmlFor="AddEntryName">Add Expense</label>
        
        <input
          autoFocus
          ref={inputRef}
          id="AddEntryName"
          type="text"
          placeholder="Expense Name"
          required
          value={newEntry.name}
          onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value, date: getDate() })}
          style={{marginTop:'12px'}}
        />
        <input
          id="AddEntryAmount"
          type="number"
          placeholder="Amount ($)"
          required
          value={newEntry.amount || ''}
          onChange={(e) =>
            setNewEntry({ ...newEntry, amount: parseFloat(e.target.value), date: getDate() })
          }
          onSubmit={() => inputRef.current.focus()}
        />
        <button
          className="addButton" 
          type="submit" 
          aria-label="Add expense"
          onClick={() => inputRef.current.focus()}>+</button>
      </form>
  );
};

export default AddEntry;
