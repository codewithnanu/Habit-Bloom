import './Headers.css'
import {Link} from "react-router"

export default function Headers() {
  return (
    <header className="header">
      <h1 className="brand-title">
        <svg className="brand-icon" viewBox="0 0 40 40" aria-hidden="true">
          <rect x="1" y="1" width="38" height="38" rx="13" />
          <path d="M20 29V18m0 5c0-6-4-9-9-9 0 5 3 9 9 9Zm0-4c0-5 3-8 9-8 0 5-3 8-9 8Z" />
        </svg>
        <span>Habit Bloom</span>
      </h1>
      <ul className="navbar">
        <li><Link to="/" >Dashboard</Link></li>
        <li><Link to="/heatmap">Heatmap</Link></li>
        <li><Link to="/stats">Stats</Link></li>
        {/* <li>Settings</li> */}
      </ul>
      <div className="header-actions">
       <Link to="/addhabit" ><button type="button">Add Habit</button></Link>
      </div>
    </header>
  )
}
