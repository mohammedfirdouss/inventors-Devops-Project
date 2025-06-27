const API_BASE_URL = 'http://localhost:3000/api';

class TodoAPI {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error(`API request failed:`, error);
            throw error;
        }
    }

    // Get all todos with optional filters
    async getTodos(filters = {}) {
        const params = new URLSearchParams();

        if (filters.completed !== undefined && filters.completed !== '') {
            params.append('completed', filters.completed);
        }
        if (filters.priority) {
            params.append('priority', filters.priority);
        }
        if (filters.sort) {
            params.append('sort', filters.sort);
        }

        const queryString = params.toString();
        const endpoint = queryString ? `/todos?${queryString}` : '/todos';

        return this.request(endpoint);
    }

    // Get single todo by ID
    async getTodo(id) {
        return this.request(`/todos/${id}`);
    }

    // Create new todo
    async createTodo(todoData) {
        return this.request('/todos', {
            method: 'POST',
            body: JSON.stringify(todoData),
        });
    }

    // Update todo
    async updateTodo(id, updates) {
        return this.request(`/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }

    // Delete todo
    async deleteTodo(id) {
        return this.request(`/todos/${id}`, {
            method: 'DELETE',
        });
    }

    // Get todo statistics
    async getStats() {
        return this.request('/todos/stats/summary');
    }

    // Check API health
    async checkHealth() {
        return this.request('/health');
    }
}

export default new TodoAPI(); 