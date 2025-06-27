const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/todos - Get all todos
router.get('/', async (req, res) => {
    try {
        const { completed, priority, sort } = req.query;

        // Build filter object
        const filter = {};
        if (completed !== undefined) {
            filter.completed = completed === 'true';
        }
        if (priority) {
            filter.priority = priority;
        }

        // Build sort object
        let sortObj = { createdAt: -1 }; // Default: newest first
        if (sort === 'oldest') sortObj = { createdAt: 1 };
        if (sort === 'alphabetical') sortObj = { title: 1 };
        if (sort === 'priority') sortObj = { priority: -1, createdAt: -1 };

        const todos = await Todo.find(filter).sort(sortObj);

        res.json({
            success: true,
            count: todos.length,
            data: todos,
            message: `Found ${todos.length} todos 🎉`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch todos',
            message: error.message
        });
    }
});

// GET /api/todos/:id - Get single todo
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found',
                message: 'The todo you\'re looking for doesn\'t exist 🤔'
            });
        }

        res.json({
            success: true,
            data: todo,
            message: 'Todo found! 🎯'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch todo',
            message: error.message
        });
    }
});

// POST /api/todos - Create new todo
router.post('/', async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                message: 'Todo title is required! 📝'
            });
        }

        const todo = new Todo({
            title: title.trim(),
            description: description ? description.trim() : '',
            priority: priority || 'medium'
        });

        const savedTodo = await todo.save();

        res.status(201).json({
            success: true,
            data: savedTodo,
            message: 'Todo created successfully! 🎉'
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                message: Object.values(error.errors)[0].message
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to create todo',
            message: error.message
        });
    }
});

// PUT /api/todos/:id - Update todo
router.put('/:id', async (req, res) => {
    try {
        const { title, description, completed, priority } = req.body;

        const updateData = {};
        if (title !== undefined) updateData.title = title.trim();
        if (description !== undefined) updateData.description = description.trim();
        if (completed !== undefined) updateData.completed = completed;
        if (priority !== undefined) updateData.priority = priority;

        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found',
                message: 'Cannot update a todo that doesn\'t exist 🤷‍♂️'
            });
        }

        const action = completed !== undefined ?
            (completed ? 'marked as complete' : 'marked as incomplete') :
            'updated';

        res.json({
            success: true,
            data: todo,
            message: `Todo ${action} successfully! ✨`
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                message: Object.values(error.errors)[0].message
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to update todo',
            message: error.message
        });
    }
});

// DELETE /api/todos/:id - Delete todo
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found',
                message: 'Cannot delete a todo that doesn\'t exist 🤷‍♂️'
            });
        }

        res.json({
            success: true,
            data: todo,
            message: 'Todo deleted successfully! 🗑️'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete todo',
            message: error.message
        });
    }
});

// GET /api/todos/stats/summary - Get todos statistics
router.get('/stats/summary', async (req, res) => {
    try {
        const total = await Todo.countDocuments();
        const completed = await Todo.countDocuments({ completed: true });
        const pending = total - completed;

        const priorityStats = await Todo.aggregate([
            { $group: { _id: '$priority', count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                total,
                completed,
                pending,
                completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
                priorityBreakdown: priorityStats.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, {})
            },
            message: 'Statistics calculated! 📊'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to get statistics',
            message: error.message
        });
    }
});

module.exports = router; 