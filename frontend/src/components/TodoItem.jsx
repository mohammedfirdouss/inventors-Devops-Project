import { useState } from 'react'

function TodoItem({ todo, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState({
        title: todo.title,
        description: todo.description,
        priority: todo.priority
    })
    const [isUpdating, setIsUpdating] = useState(false)

    const priorityEmojis = {
        high: '🔴',
        medium: '🟡',
        low: '🟢'
    }

    const handleToggleComplete = async () => {
        setIsUpdating(true)
        try {
            await onUpdate(todo._id, { completed: !todo.completed })
        } finally {
            setIsUpdating(false)
        }
    }

    const handleEdit = () => {
        setIsEditing(true)
        setEditData({
            title: todo.title,
            description: todo.description,
            priority: todo.priority
        })
    }

    const handleSaveEdit = async () => {
        if (!editData.title.trim()) {
            return
        }

        setIsUpdating(true)
        try {
            await onUpdate(todo._id, {
                title: editData.title.trim(),
                description: editData.description.trim(),
                priority: editData.priority
            })
            setIsEditing(false)
        } finally {
            setIsUpdating(false)
        }
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        setEditData({
            title: todo.title,
            description: todo.description,
            priority: todo.priority
        })
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            await onDelete(todo._id)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
            <div className="todo-content">
                <div className="todo-checkbox">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={handleToggleComplete}
                        disabled={isUpdating}
                        id={`todo-${todo._id}`}
                    />
                    <label htmlFor={`todo-${todo._id}`} className="checkbox-label">
                        <span className="checkmark">✓</span>
                    </label>
                </div>

                <div className="todo-main">
                    {isEditing ? (
                        <div className="todo-edit-form">
                            <input
                                type="text"
                                value={editData.title}
                                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                                className="edit-title-input"
                                maxLength={200}
                                disabled={isUpdating}
                            />
                            <textarea
                                value={editData.description}
                                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                                className="edit-description-input"
                                maxLength={500}
                                rows={2}
                                placeholder="Add a description (optional)"
                                disabled={isUpdating}
                            />
                            <select
                                value={editData.priority}
                                onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value }))}
                                className="edit-priority-select"
                                disabled={isUpdating}
                            >
                                <option value="low">🟢 Low Priority</option>
                                <option value="medium">🟡 Medium Priority</option>
                                <option value="high">🔴 High Priority</option>
                            </select>
                        </div>
                    ) : (
                        <div className="todo-display">
                            <h4 className="todo-title">{todo.title}</h4>
                            {todo.description && (
                                <p className="todo-description">{todo.description}</p>
                            )}
                            <div className="todo-meta">
                                <span className="todo-priority">
                                    {priorityEmojis[todo.priority]} {todo.priority}
                                </span>
                                <span className="todo-date">
                                    Created {formatDate(todo.createdAt)}
                                </span>
                                {todo.ageInDays > 0 && (
                                    <span className="todo-age">
                                        {todo.ageInDays} day{todo.ageInDays !== 1 ? 's' : ''} old
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="todo-actions">
                    {isEditing ? (
                        <div className="edit-actions">
                            <button
                                onClick={handleSaveEdit}
                                className="save-btn"
                                disabled={isUpdating || !editData.title.trim()}
                            >
                                {isUpdating ? '⏳' : '💾'}
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="cancel-btn"
                                disabled={isUpdating}
                            >
                                ❌
                            </button>
                        </div>
                    ) : (
                        <div className="view-actions">
                            <button
                                onClick={handleEdit}
                                className="edit-btn"
                                disabled={isUpdating}
                                title="Edit todo"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={handleDelete}
                                className="delete-btn"
                                disabled={isUpdating}
                                title="Delete todo"
                            >
                                🗑️
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TodoItem 