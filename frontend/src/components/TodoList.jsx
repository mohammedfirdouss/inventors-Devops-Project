import TodoItem from './TodoItem'

function TodoList({ todos, loading, onUpdateTodo, onDeleteTodo }) {
    if (loading) {
        return (
            <section className="todos-section">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <span>Loading your awesome todos... 🚀</span>
                </div>
            </section>
        )
    }

    if (todos.length === 0) {
        return (
            <section className="todos-section">
                <div className="empty-state">
                    <div className="empty-content">
                        <span className="empty-emoji">🎉</span>
                        <h3>No todos yet!</h3>
                        <p>Add your first todo above to get started.</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="todos-section">
            <div className="todos-list">
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onUpdate={onUpdateTodo}
                        onDelete={onDeleteTodo}
                    />
                ))}
            </div>
        </section>
    )
}

export default TodoList 