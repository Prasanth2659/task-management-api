const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Joi = require('joi');

// Validation schema
const taskSchema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED').optional(),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').required(),
    dueDate: Joi.date().optional()
});

// POST /tasks
router.post('/', async (req, res) => {
    try {
        const { error, value } = taskSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const task = new Task(value);
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// GET /tasks
router.get('/', async (req, res) => {
    try {
        const { status, priority, sort, limit = 10, skip = 0 } = req.query;
        const query = {};
        if (status) query.status = status;
        if (priority) query.priority = priority;

        const tasks = await Task.find(query)
            .sort(sort ? { [sort]: 1 } : { createdAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        res.send(tasks);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// GET /tasks/:id
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send('Task not found');

        res.send(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT /tasks/:id
router.put('/:id', async (req, res) => {
    try {
        const { error, value } = taskSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const task = await Task.findByIdAndUpdate(req.params.id, { $set: value, updatedAt: Date.now() }, { new: true });
        if (!task) return res.status(404).send('Task not found');

        res.send(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).send('Task not found');

        res.status(204).send();
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
