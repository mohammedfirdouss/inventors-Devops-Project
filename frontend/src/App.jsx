import { useState, useEffect } from 'react'
import todoApi from './services/todoApi'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoFilters from './components/TodoFilters'
import TodoList from './components/TodoList'
import Toast from './components/Toast'
import Footer from './components/Footer'

function App() {
    const [todos, setTodos] = useState([])
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0,
        completionRate: 0
    })
    const [filters, setFilters] = useState({
        completed: '',
        priority: '',
        sort: ''
    })
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState(null)

    // Fetch todos from API
    const fetchTodos = async () => {
        try {
            setLoading(true)
            const response = await todoApi.getTodos(filters)
            setTodos(response.data)
        } catch (error) {
            showToast('Failed to load todos: ' + error.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    // Fetch statistics
    const fetchStats = async () => {
        try {
            const response = await todoApi.getStats()
            setStats(response.data)
        } catch (error) {
            console.error('Failed to load stats:', error)
        }
    }

    // Show toast notification
    const showToast = (message, type = 'success') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 4000)
    }

    // Add new todo
    const addTodo = async (todoData) => {
        try {
            const response = await todoApi.createTodo(todoData)
            await fetchTodos()
            await fetchStats()
            showToast(response.message)
        } catch (error) {
            showToast('Failed to add todo: ' + error.message, 'error')
        }
    }

    // Update todo
    const updateTodo = async (id, updates) => {
        try {
            const response = await todoApi.updateTodo(id, updates)
            await fetchTodos()
            await fetchStats()
            showToast(response.message)
        } catch (error) {
            showToast('Failed to update todo: ' + error.message, 'error')
        }
    }

    // Delete todo
    const deleteTodo = async (id) => {
        try {
            const response = await todoApi.deleteTodo(id)
            await fetchTodos()
            await fetchStats()
            showToast(response.message)
        } catch (error) {
            showToast('Failed to delete todo: ' + error.message, 'error')
        }
    }

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
    }

    // Load data on component mount and when filters change
    useEffect(() => {
        fetchTodos()
    }, [filters])

    useEffect(() => {
        fetchStats()
    }, [])

    return (
        <div className="app">
            <Header stats={stats} />

            <main className="main">
                <div className="container">
                    <TodoForm onAddTodo={addTodo} />
                    <TodoFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                    <TodoList
                        todos={todos}
                        loading={loading}
                        onUpdateTodo={updateTodo}
                        onDeleteTodo={deleteTodo}
                    />
                </div>
            </main>

            <Footer />

            {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </div>
    )
}

export default App 