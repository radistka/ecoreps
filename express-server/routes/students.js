// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');

const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schemas

const studentSchema = new mongoose.Schema({
    name: String,
    finished_lessons: [{ lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }, finished_at: Date }],
});

// create mongoose model
const Student = mongoose.model('Student', studentSchema);

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

/* GET all students. */
router.get('/students', async (req, res) => {
    try {
        const students = await Student.find({}).populate('finished_lessons.lesson');
        res.status(200).json(students);
    } catch (err) { res.status(500).send(error) }
});


/* DELETE one student. */
router.delete('/students/:id', (req, res) => {
    Student.remove({_id:req.params.id}, (err) => {
        if (err) res.status(500).send(error);
        res.status(200).json({deleted: true});
    });
});

/* GET one student. */
router.get('/students/:id', (req, res) => {
    try {
        const student = Student.findById(req.params.id).populate('finished_lessons.lesson');
        res.status(200).json(student);
    } catch (err) { res.status(500).send(error) }

});

/* Create a student. */
router.post('/students', (req, res) => {
    let student = new Student({
        name: req.body.name,
        finished_lessons: [],
    });
	student.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'Student created successfully'
        });
    });
});

/* Update lesson status */
router.put('/students/:id/lessons', async(req, res) => {
    let student;
    try {
        student = await Student.findById(req.params.id);
    } catch (err) {
        return res.status(500).send(error)
    }

    const lessons = student.finished_lessons || [];

    student.finished_lessons = req.body.done === true
        ? _.concat(lessons, [{ lesson: req.body.lesson_id, finished_at: new Date() }])
        : _.differenceWith(lessons, [{ lesson: req.body.lesson_id }], (l, n) => l.lesson.toString() === n.lesson);

    let updated;
    try {
        updated = await student.save();
    } catch (err) {
        return res.status(500).send(error)
    }
    return res.status(200).json(updated);
});

module.exports = router;
