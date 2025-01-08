const LineEntry = ({ entry, handleDelete, getDate, goals }) => {
  const currentDate = getDate();
  const filteredGoals = goals.filter(goal => goal.expiryDate >= currentDate);
  const maxSingleExpenseObj = filteredGoals.find(goal => goal.name === 'Max Single Expense');
  let lowestAmount;
  maxSingleExpenseObj ? lowestAmount = maxSingleExpenseObj.amount : lowestAmount = Infinity;
  const warningAmount = lowestAmount * 0.85;

  return (
    <li
      className="entry"
      key={entry._id}
    >      
      <label 
        style={{ 
          color: 
            entry.amount > lowestAmount ? 'rgb(255, 70, 70)' : 
            entry.amount > warningAmount ? 'yellow' :
             'white' 
        }}
      > { entry.name }: ${entry.amount.toFixed(2)}</label>

      <button onClick={() => handleDelete(entry._id)}>delete</button>
    </li>
  )
}

export default LineEntry;