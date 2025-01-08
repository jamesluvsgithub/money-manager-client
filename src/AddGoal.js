const AddGoal = ({ newGoal, setNewGoal, handleGoalSubmit, viewingMode, setViewingMode }) => {

  const toggleViewingMode = () => {
    if (viewingMode === 'expenses'){
      setViewingMode('goals');
    } else if (viewingMode === 'goals'){
      setViewingMode('expenses');
    }
  }

  return (
    <>
      <button 
        style={{ display: viewingMode === 'expenses' ? 'block' : 'none'}}
        className='toggleGoals'
        onClick={(e) => {
          toggleViewingMode();
          e.target.blur();
        }}
      >
        Manage Goals
      </button>


      <div style={{backgroundColor:'rgb(225, 200, 225)', width:'95%', margin:'12px', marginTop:'12px', padding:'12px', borderRadius:'5px', display: viewingMode === 'goals' ? 'block' : 'none'}} className='addGoal'>
        <form>
          <label>Add Goal: </label>
          <select 
            value={newGoal.name}
            defaultValue={'Max Total Expenses'}
            onChange={(e) => {
            setNewGoal({...newGoal, name: e.target.value, amount:0, unit:'days'});
          }}>
            <option value='Max Total Expenses'>Max Total Expenses</option>
            <option value='Max Single Expense'>Max Single Expense</option>
          </select>
        </form>

        <form 
          style={{marginTop: '14px', display: newGoal.name === 'Max Total Expenses' ? 'block': 'none'}}
          onSubmit={handleGoalSubmit}
        >
          <label htmlFor='AddGoalAmount'>Amount: </label>
          <input 
            autoFocus
            id='AddGoalAmount'
            type='number'
            required  
            placeholder='Amount ($)'
            value={newGoal.amount || ''}
            onChange={(e) => setNewGoal({...newGoal, amount: parseFloat(e.target.value)})}
          />

          <label htmlFor='AddGoalAmount'> For: </label>
          <input 
            id='AddGoalAmount'
            type='number'
            required  
            placeholder='Number of'
            min={0}
            value={newGoal.units || ''}
            onChange={(e) => setNewGoal({...newGoal, units: parseInt(e.target.value)})}
          />

          <select
          defaultValue={'days'}
            value={newGoal.unit}
            required
            onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
          >
            <option value='days'>Days</option>
            <option value='weeks'>Weeks</option>
            <option value='months'>Months (31 days)</option>
          </select>

          <button
            className="addButton" 
            type="submit" 
            aria-label="Add goal"
            onClick={(e) => {
              handleGoalSubmit(e);
              e.target.blur();
            }}
          >+</button>
        </form>

        <form 
          style={{marginTop: '14px', display: newGoal.name === 'Max Single Expense' ? 'block': 'none'}}
          onSubmit={handleGoalSubmit}
        >
          <label htmlFor='AddGoalAmount'>Amount: </label>
          <input 
            autoFocus
            id='AddGoalAmount'
            type='number'
            required  
            placeholder='Amount ($)'
            value={newGoal.amount || ''}
            onChange={(e) => setNewGoal({...newGoal, amount: parseFloat(e.target.value)})}
          />

          <label htmlFor='AddGoalAmount'> For: </label>
          <input 
            id='AddGoalAmount'
            type='number'
            required  
            placeholder='Number of'
            min={0}
            value={newGoal.units || ''}
            onChange={(e) => setNewGoal({...newGoal, units: parseInt(e.target.value)})}
          />

          <select
            defaultValue={'days'}
            value={newGoal.unit}
            required
            onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
          >
            <option disabled selected>Select</option>
            <option value='days'>Days</option>
            <option value='weeks'>Weeks</option>
            <option value='months'>Months (31 days)</option>
          </select>

          <button
            className="addButton" 
            type="submit" 
            aria-label="Add goal"
            onClick={(e) => {
              handleGoalSubmit(e);
              e.target.blur();
            }}
          >+</button>
        </form>
      </div>


      <button 
        style={{width:'95%', margin:'12px', padding:'12px', borderRadius:'5px', display: viewingMode === 'goals' ? 'block' : 'none'}}
        onClick={(e) => {
          toggleViewingMode();
          e.target.blur();
        }}
      >
        Manage Expenses
      </button>
    </>
  );
};

export default AddGoal;
