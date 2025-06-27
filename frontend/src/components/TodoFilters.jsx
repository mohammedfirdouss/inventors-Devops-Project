function TodoFilters({ filters, onFilterChange }) {
    const handleFilterChange = (filterType, value) => {
        const newFilters = {
            ...filters,
            [filterType]: value
        }
        onFilterChange(newFilters)
    }

    const clearFilters = () => {
        onFilterChange({
            completed: '',
            priority: '',
            sort: ''
        })
    }

    const hasActiveFilters = filters.completed || filters.priority || filters.sort

    return (
        <section className="filters-section">
            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="statusFilter">Filter by Status:</label>
                    <select
                        id="statusFilter"
                        value={filters.completed}
                        onChange={(e) => handleFilterChange('completed', e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Todos</option>
                        <option value="false">Pending</option>
                        <option value="true">Completed</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="priorityFilter">Filter by Priority:</label>
                    <select
                        id="priorityFilter"
                        value={filters.priority}
                        onChange={(e) => handleFilterChange('priority', e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Priorities</option>
                        <option value="high">🔴 High</option>
                        <option value="medium">🟡 Medium</option>
                        <option value="low">🟢 Low</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="sortSelect">Sort by:</label>
                    <select
                        id="sortSelect"
                        value={filters.sort}
                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="alphabetical">A-Z</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>

                {hasActiveFilters && (
                    <div className="filter-group">
                        <button
                            onClick={clearFilters}
                            className="clear-filters-btn"
                            title="Clear all filters"
                        >
                            <span>Clear Filters</span>
                            <span className="clear-icon">✖️</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default TodoFilters 