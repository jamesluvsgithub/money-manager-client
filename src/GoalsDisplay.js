import GoalList from "./GoalList";

const GoalsDisplay = ({ goals, handleGoalDelete, getDate }) => {
  return (
    <>
      { goals.length ? (
        <GoalList 
          goals={goals}
          handleGoalDelete={handleGoalDelete}
          getDate={getDate}
        />
      ) : (
        <p 
        className='goal'
        style={{
          color: "white",
          paddingLeft: "1.5vh",
          marginTop:'1.5vh',
          marginLeft:'1.5vh'
        }}>No goals ...</p>
      )}
    </>
  )
}

export default GoalsDisplay