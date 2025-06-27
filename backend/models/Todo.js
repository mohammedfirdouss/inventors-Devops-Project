const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Todo title is required'],
        trim: true,
        maxlength: [200, 'Todo title cannot exceed 200 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
TodoSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Add a virtual for the todo's age in days
TodoSchema.virtual('ageInDays').get(function () {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Ensure virtual fields are serialized
TodoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Todo', TodoSchema); 