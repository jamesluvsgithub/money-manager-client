const LineGoal = ({ goal, handleGoalDelete, expired }) => {
  const year = Math.floor(goal.expiryDate / 10000);
  const month = Math.floor((goal.expiryDate) % 10000 / 100);
  const day = goal.expiryDate % 100;

  return (
    <li
      className='goal'
      key={goal._id}
    >
      <p style={{ textDecoration: expired === true ? 'line-through' : 'none' }}>{goal.name}</p>
      <p style={{ textDecoration: expired === true ? 'line-through' : 'none' }}>${goal.amount}</p>
      <p style={{ display: expired === true ? 'none' : 'auto' }}>expires after {day}/{month}/{year} (DD/MM/YYY)</p>
      <p style={{ display: expired === true ? 'auto' : 'none' }}>expired {day+1}/{month}/{year} (DD/MM/YYY)</p>
      <button className='addGoal' onClick={() => handleGoalDelete(goal._id)} style={{ marginTop:'1.5vh' }}>delete</button>
    </li>
  )
}

export default LineGoal;