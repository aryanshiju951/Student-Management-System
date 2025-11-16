import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose.connect("mongodb://localhost:27017/studentdb")
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.error("MongoDB connection error:", err));


const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  course: { type: String, required: true }
});

const Student = mongoose.model("Student", studentSchema);


// Root
app.get("/", (req, res) => {
  res.send("Welcome to Student Management API");
});

// Add student
app.post("/students", async (req, res, next) => {
  try {
    const { name, age, course } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Name must be a non-empty string" });
    }
    if (!age || isNaN(age)) {
      return res.status(400).json({ error: "Age must be a number" });
    }
    if (!course || typeof course !== "string") {
      return res.status(400).json({ error: "Course must be a non-empty string" });
    }

    const student = new Student({ name, age, course });
    await student.save();
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
});

// Get all students
app.get("/students", async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

// Edit student
app.put("/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, course } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Name must be a non-empty string" });
    }
    if (!age || isNaN(age)) {
      return res.status(400).json({ error: "Age must be a number" });
    }
    if (!course || typeof course !== "string") {
      return res.status(400).json({ error: "Course must be a non-empty string" });
    }

    const student = await Student.findByIdAndUpdate(
      id,
      { name, age, course },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
});

// Delete student
app.delete("/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
});


app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
