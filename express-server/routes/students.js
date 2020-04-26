// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schemas

const studentSchema = new mongoose.Schema({
    name: String
});

// create mongoose model
const Student = mongoose.model('Student', studentSchema);

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

/* GET all students. */
router.get('/students', (req, res) => {
    Student.find({}, (err, students) => {
        if (err) res.status(500).send(error)
        res.status(200).json(students);
    });
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
    Student.findById(req.params.id, (err, students) => {
        if (err) res.status(500).send(error)
        res.status(200).json(students);
    });
});

/* Create a student. */
router.post('/students', (req, res) => {
    let student = new Student({
        name: req.body.name
    });

	student.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'Student created successfully'
        });
    });
});

module.exports = router;
