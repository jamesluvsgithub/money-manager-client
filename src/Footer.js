const Footer = ({ entries }) => {
  const totalAmount = entries.reduce((total, entry) => total + entry.amount, 0)

  return (
    <footer>
      total expenses: ${totalAmount.toFixed(2)}
    </footer>
  )
}

export default Footer