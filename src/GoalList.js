import LineGoal from "./LineGoal";

const GoalList = ({ goals, handleGoalDelete, getDate }) => {
  const currentDate = getDate();
  return (
    <ul style={{marginLeft:'1.5vh', marginTop:'1.5vh', backgroundColor:'rgb(150, 100, 150)', borderRadius:'8px', padding:'5px', width:'96%'}} className='goalList'>
      <p style={{color:'white'}}>Goals:</p>
      {goals.map((goal) => (
        <LineGoal
          key={goal._id}
          goal={goal}
          handleGoalDelete={handleGoalDelete}
          expired={goal.expiryDate <= currentDate}
        />
      ))}
    </ul>
  )
}

export default GoalList;