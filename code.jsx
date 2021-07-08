const ATMDeposit = ({ onChange, isDeposit, atmMode, validTransaction }) => {
  const choice = ['Deposit', 'Cash Back'];
  let truthy = false
  let isValid = validTransaction
  console.log(`IS VALID: ${isValid}`)
  if (atmMode != '') {truthy = true}
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      {
        truthy && 
        <div> 
          <h3> {choice[Number(!isDeposit)]}</h3>
          <input id="number-input" type="number" width="200" onChange={onChange}></input>
           
        </div>
      }
      {
        isValid &&
        <div>
          <input type="submit" width="200" value="Submit" id="submit-input"></input>
        </div>
      }
      
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('')
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
    setValidTransaction(false)
    if (event.target.value <= 0) return
    if (atmMode == 'Cash Back' && event.target.value > totalState) {
      setValidTransaction(false)
    } else {setValidTransaction(true)}
    

  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
    setAtmMode(event.target.value)
    if (event.target.value == 'Deposit') {
      setIsDeposit(true)
    } else {setIsDeposit(false)}
    if (deposit <= 0) return
    if (event.target.value == 'Cash Back' && deposit > totalState) {
      setValidTransaction(false)
    } else {setValidTransaction(true)}

  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
      <option id="no-selection" value=""></option>
      <option id="deposit-selection" value="Deposit">Deposit</option>
      <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode} validTransaction={validTransaction}></ATMDeposit>
    </form>

  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
