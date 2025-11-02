import React from 'react'
import TransactionsTable from './components/TransactionsTable'

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Transactions</h1>
        <p>Simple transactions viewer — demo</p>
      </header>
      <main>
        <TransactionsTable />
      </main>
    </div>
  )
}
