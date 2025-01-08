import EntryList from "./EntryList.js"

const EntriesDisplay = ({ entries, handleDelete, goals, getDate }) => {
  return (
    <>
      { entries.length ? (
        <EntryList 
          entries={entries}
          handleDelete={handleDelete}
          goals={goals}
          getDate={getDate}
        />
      ) : (
        <p 
        className='entry'
        style={{
          color: "white",
          paddingLeft: "1.5vh",
          marginTop:'1.5vh',
          marginRight:'1.5vh'
        }}>No expenses!</p>
      )}
    </>
  )
}

export default EntriesDisplay;