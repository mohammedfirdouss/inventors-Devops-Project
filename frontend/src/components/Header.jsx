function Header({ stats }) {
    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">
                    <span className="emoji">🚀</span>
                    Inventors Community
                    <span className="subtitle">Todo List</span>
                </h1>
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-number">{stats.total}</span>
                        <span className="stat-label">Total</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{stats.completed}</span>
                        <span className="stat-label">Done</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{stats.pending}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat-item completion-rate">
                        <span className="stat-number">{stats.completionRate}%</span>
                        <span className="stat-label">Complete</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header 