import React, { useEffect, useState } from "react"
import axios from "axios"

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api"

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState("")
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)

  useEffect(() => {
    setLoading(true)
    axios.get(`${API}/transactions`)
      .then(r => {
        setTransactions(r.data)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = transactions.filter(t =>
    q === "" ||
    t.id.toString().includes(q) ||
    (t.symbol && t.symbol.toLowerCase().includes(q.toLowerCase())) ||
    (t.type && t.type.toLowerCase().includes(q.toLowerCase()))
  )

  const total = filtered.length
  const pages = Math.max(1, Math.ceil(total / perPage))
  const pageItems = filtered.slice((page-1)*perPage, page*perPage)

  return (
    <div className="table-wrapper">
      <div className="controls">
        <input placeholder="Search by id, symbol, type..." value={q} onChange={e => { setQ(e.target.value); setPage(1) }} />
        <div className="pagination-info">{total} results</div>
      </div>

      {loading ? <div>Loading...</div> : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Symbol</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.symbol}</td>
                  <td>{t.type}</td>
                  <td>{t.quantity}</td>
                  <td>{t.price}</td>
                  <td>{new Date(t.date).toLocaleString()}</td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr><td colSpan="6">No results</td></tr>
              )}
            </tbody>
          </table>

          <div className="pager">
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}>Prev</button>
            <span>Page {page} / {pages}</span>
            <button onClick={() => setPage(p => Math.min(pages, p+1))} disabled={page===pages}>Next</button>
          </div>
        </>
      )}
    </div>
  )
}
