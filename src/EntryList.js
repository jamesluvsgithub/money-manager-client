import LineEntry from "./LineEntry"

const EntryList = ({ entries, handleDelete, goals, getDate }) => {
  return (
    <ul style={{marginLeft:'1.5vh', marginTop:'1.5vh', backgroundColor:'rgb(60, 60, 120)', borderRadius:'8px', padding:'5px', width:'96%'}} className='entryList'>
      <p style={{color:'white'}}>Expenses:</p>
      {entries.map((entry) => (
        <LineEntry 
          key={entry._id}
          entry={entry}
          handleDelete={handleDelete}
          goals={goals}
          getDate={getDate}
        />
      ))}
    </ul> 
  )
}

export default EntryList;