const express = require('express');
const path = require('path'); // NEW

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

const port = process.env.PORT || 3001;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
mongoose.connect('mongodb://localhost:27017/fourth', {useNewUrlParser: true});

const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};
app.use(express.static(DIST_DIR)); // NEW
app.get('/api', (req, res) => {
  res.send(mockResponse);
});
app.get('/', (req, res) => {
 res.send(DIST_DIR); // EDIT
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



let Schema = mongoose.Schema;
let schema = new Schema({ 
    firstName: String, 
    lastName: String, 
    age: Number 
});
let Student = mongoose.model('Student', schema);


const studentController = {
  // Create a new student in the Database
  // Their information will be sent in the request body
  // This should send the created student
  createStudent(req, res) {
    let { firstName, lastName, age } = req.body
    let data = { firstName: firstName, lastName: lastName, age: age } 
    let student = new Student(data);
    student.save((err, docs) => {
      if (!docs) {
        return res.status(418).send("Error 418 - could not save into database");
      }
      else {
        return res.status(200).send(docs)
      }
    })
  },

  // Get a student from the database and send it in the response
  // Their first name will be in the request parameter 'name'
  // This should send the found student
  getStudent(req, res) {
    let name = req.params.name;
    let tom = Student.findOne({firstName: name}, (err, doc) => {
      if (!doc) {
        console.log("what is this", err);
        return res.status(418).send("Error 418 - could not find student in database");
      }
      else {
        return res.status(200).send(doc)
      }
    })

    console.log(tom)
  },

  // Get a student from the database and update the student
  // The student's first name will be in the request parameter 'name'
  // The student's new first name will be in the request body
  updateStudent(req, res) {
    let name = req.params.name;
    let { firstName, lastName, age } = req.body
    let data = { firstName: firstName, lastName: lastName, age: age } 
    Student.findOneAndUpdate({firstName: name}, {$set:data}, {new: true}, function(err, doc){
      if (!doc) {
        return res.status(418).send("Error 418 - could not find student in database");
      }
      else {
        return res.status(200).send(doc)
      }
    })
  },

  // Delete a student from the database
  // The student's first name will be sent in the request parameter 'name'
  // This should send a success status code
  deleteStudent(req, res) {
    let name = req.params.name;
    let bob = Student.findOne({firstName: name})
    console.log(bob)
    if (false){
      console.log('hi')
      return res.status(418).send("Error 418 - could not find student in database")}
    else{
    Student.deleteOne({ firstName: name }, (err, result) => {
      //console.log(result.deletedCount);
      if (!result.deletedCount) { 
        return res.status(418).send("Error 418 - could not find student in database");
      }
      else {
        return res.status(200).send(name + " successfully deleted");
      }
    });
  }
  },
};


const studentRouter = express.Router();

// Create a student in the database
// localhost://3000/student
studentRouter.post('/', studentController.createStudent);

// Get a student from the database
// localhost://3000/student/"name"
studentRouter.get('/:name', studentController.getStudent);

// Change a students name
// localhost://3000/student/"name"
studentRouter.patch('/:name', studentController.updateStudent);

// Delete a student from the database
// localhost://3000/student/"name"
studentRouter.delete('/:name', studentController.deleteStudent);

app.use('/student', studentRouter);








app.listen(port, function () {
 console.log('App listening on port: ' + port);
});