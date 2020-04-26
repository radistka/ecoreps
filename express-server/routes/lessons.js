// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schemas
const lessonSchema = new mongoose.Schema({
    title: String,
    content: String
});

// create mongoose model
const Lesson = mongoose.model('Lesson', lessonSchema);

/* GET all lessons. */
router.get('/lessons', (req, res) => {
    Lesson.find({}, (err, lessons) => {
        if (err) res.status(500).send(error)
        res.status(200).json(lessons);
    });
});

/* DELETE one lesson. */
router.delete('/lessons/:id', (req, res) => {
    Lesson.remove({_id:req.params.id}, (err) => {
        if (err) res.status(500).send(error);
        res.status(200).json({deleted: true});
    });
});

/* GET one lesson. */
router.get('/lessons/:id', (req, res) => {
    Lesson.findById(req.params.id, (err, lessons) => {
        if (err) res.status(500).send(error);
        res.status(200).json(lessons);
    });
});

/* Create a lesson. */
router.post('/lessons', (req, res) => {
    let lesson = new Lesson({
        title: req.body.title,
        content: "some content"
    });

	lesson.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'Lesson created successfully'
        });
    });
});

module.exports = router;
