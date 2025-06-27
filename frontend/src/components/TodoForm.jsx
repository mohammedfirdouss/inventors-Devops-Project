import { useState } from 'react'

function TodoForm({ onAddTodo }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium'
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.title.trim()) {
            return
        }

        setIsSubmitting(true)

        try {
            await onAddTodo({
                title: formData.title.trim(),
                description: formData.description.trim(),
                priority: formData.priority
            })

            // Reset form
            setFormData({
                title: '',
                description: '',
                priority: 'medium'
            })
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="add-todo-section">
            <form onSubmit={handleSubmit} className="todo-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="What needs to be done? ✨"
                        className="todo-input"
                        maxLength={200}
                        required
                        disabled={isSubmitting}
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Add a description (optional)"
                        className="todo-textarea"
                        maxLength={500}
                        rows={2}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="form-actions">
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="priority-select"
                        disabled={isSubmitting}
                    >
                        <option value="low">🟢 Low Priority</option>
                        <option value="medium">🟡 Medium Priority</option>
                        <option value="high">🔴 High Priority</option>
                    </select>
                    <button
                        type="submit"
                        className={`add-btn ${isSubmitting ? 'loading' : ''}`}
                        disabled={isSubmitting || !formData.title.trim()}
                    >
                        <span className="btn-text">
                            {isSubmitting ? 'Adding...' : 'Add Todo'}
                        </span>
                        <span className="btn-emoji">{isSubmitting ? '⏳' : '➕'}</span>
                    </button>
                </div>
            </form>
        </section>
    )
}

export default TodoForm 