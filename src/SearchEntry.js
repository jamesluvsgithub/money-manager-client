const SearchEntry = ({ setSearch, setSearchMax, setSearchMin, searchMax, searchMin, selectedFilter, setSelectedFilter, setFromYear, setFromMonth, setFromDay , setToYear, setToMonth, setToDay, viewingMode}) => {
  return (
    <div className='searchBox' style={{display: viewingMode === 'expenses' ? 'block' : 'none'}}>
      <form className='searchFilter'>
        <label htmlFor="category">Filter Expenses By:</label>
        <select
          id="category"
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value='name'>Name</option>
          <option value='amount'>Amount</option>
          <option value='date'>Date</option>
        </select>
      </form>
   
      <form
        className="searchForm"
        onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='search'>Search</label>
      
        <input
        style={{
          display: selectedFilter === 'name' ? "block" : "none"
        }}
          id='search'
          type='text'
          role='searchbox'
          placeholder='Expense Name'
          onChange={(e) => setSearch(e.target.value)}
          autoComplete='off'
        />  
      </form>

      
      <form
        className="searchForm"
        onSubmit={(e) => e.preventDefault()}
        style={{display: selectedFilter === 'amount' ? "block" : "none"}}>
        <label htmlFor='search'>Search</label>

        <input
          style={{ width:'45%' }}
          id='search'
          type='number'
          role='searchbox'
          placeholder='Max'
          autoComplete='off'
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value) && value >= searchMin) {
              setSearchMax(value);
            } else if (e.target.value === "") {
              setSearchMax(Number.MAX_SAFE_INTEGER);
            }
          }}
        />

        <input
          style={{ width:'45%' }}
          id='search'
          type='number'
          role='searchbox'
          placeholder='Min'
          autoComplete='off'
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value) && value <= searchMax) {
              setSearchMin(value);
            } else if (e.target.value === "") {
              setSearchMin(0);
            }
          }}
        />
      </form>

      <div style={{ fontSize:'16px', display: selectedFilter === 'date' ? "flex" : "none" }}>From:
        <form style={{ marginLeft:'5px'}} className='dateSearch'>
          <label htmlFor='search'></label>
          <input
            style={{ width:'30%' }}
            id='search'
            type='number'
            role='searchbox'
            placeholder='Year'
            autoComplete='off'
            onChange={(e) => {
              const inputtedYear = parseInt(e.target.value);
              if (!isNaN(inputtedYear) && inputtedYear > 0) {
                setFromYear(inputtedYear)
              } else if (e.target.value === "") {
                setFromYear(0);
              }
            }}
          />

          <select
            id="category"
            onChange={(e) => setFromMonth(parseInt(e.target.value))}
          >
            <option value='00'>Month</option>
            <option value='12'>12</option>
            <option value='11'>11</option>
            <option value='10'>10</option>
            <option value='09'>09</option>
            <option value='08'>08</option>
            <option value='07'>07</option>
            <option value='06'>06</option>
            <option value='05'>05</option>
            <option value='04'>04</option>
            <option value='03'>03</option>
            <option value='02'>02</option>
            <option value='01'>01</option>
          </select>

          <select
            id="category"
            onChange={(e) => setFromDay(parseInt(e.target.value))}
          >
            <option value='00'>Day</option>
            <option value='31'>31</option>
            <option value='30'>30</option>
            <option value='29'>29</option>
            <option value='28'>28</option>
            <option value='27'>27</option>
            <option value='26'>26</option>
            <option value='25'>25</option>
            <option value='24'>24</option>
            <option value='23'>23</option>
            <option value='22'>22</option>
            <option value='21'>21</option>
            <option value='20'>20</option>
            <option value='19'>19</option>
            <option value='18'>18</option>
            <option value='17'>17</option>
            <option value='16'>16</option>
            <option value='15'>15</option>
            <option value='14'>14</option>
            <option value='13'>13</option>
            <option value='12'>12</option>
            <option value='11'>11</option>
            <option value='10'>10</option>
            <option value='09'>09</option>
            <option value='08'>08</option>
            <option value='07'>07</option>
            <option value='06'>06</option>
            <option value='05'>05</option>
            <option value='04'>04</option>
            <option value='03'>03</option>
            <option value='02'>02</option>
            <option value='01'>01</option>
          </select>
        </form>

        <div style={{ fontSize:'16px', display: selectedFilter === 'date' ? "flex" : "none" }}>To:
          <form style={{ marginLeft:'5px'}}>
            <label htmlFor='search'></label>
            <input
              style={{ width:'30%' }}
              id='search'
              type='number'
              role='searchbox'
              placeholder='Year'
              autoComplete='off'
              onChange={(e) => {
                const inputtedYear = parseInt(e.target.value);
              if (!isNaN(inputtedYear) && inputtedYear > 0) {
                setToYear(inputtedYear)
              } else if (e.target.value === "") {
                setToYear(9999);
              }
              }}
            />

            <select
              id="category"
              onChange={(e) => setToMonth(parseInt(e.target.value))}
            >
              <option value='99'>Month</option>
              <option value='12'>12</option>
              <option value='11'>11</option>
              <option value='10'>10</option>
              <option value='09'>09</option>
              <option value='08'>08</option>
              <option value='07'>07</option>
              <option value='06'>06</option>
              <option value='05'>05</option>
              <option value='04'>04</option>
              <option value='03'>03</option>
              <option value='02'>02</option>
              <option value='01'>01</option>
            </select>

            <select
              id="category"
              onChange={(e) => setToDay(parseInt(e.target.value))}
            >
              <option value='99'>Day</option>
              <option value='31'>31</option>
              <option value='30'>30</option>
              <option value='29'>29</option>
              <option value='28'>28</option>
              <option value='27'>27</option>
              <option value='26'>26</option>
              <option value='25'>25</option>
              <option value='24'>24</option>
              <option value='23'>23</option>
              <option value='22'>22</option>
              <option value='21'>21</option>
              <option value='20'>20</option>
              <option value='19'>19</option>
              <option value='18'>18</option>
              <option value='17'>17</option>
              <option value='16'>16</option>
              <option value='15'>15</option>
              <option value='14'>14</option>
              <option value='13'>13</option>
              <option value='12'>12</option>
              <option value='11'>11</option>
              <option value='10'>10</option>
              <option value='09'>09</option>
              <option value='08'>08</option>
              <option value='07'>07</option>
              <option value='06'>06</option>
              <option value='05'>05</option>
              <option value='04'>04</option>
              <option value='03'>03</option>
              <option value='02'>02</option>
              <option value='01'>01</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchEntry