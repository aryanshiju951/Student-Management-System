const API_URL = "http://localhost:5000/students";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const errorDiv = document.getElementById("error");
  const tableBody = document.querySelector("#studentTable tbody");

  async function fetchStudents() {
    const res = await fetch(API_URL);
    const data = await res.json();
    tableBody.innerHTML = "";
    data.forEach(student => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.course}</td>
        <td>
          <button class="btn-edit" onclick="editStudent('${student._id}')">Edit</button>
          <button class="btn-delete" onclick="deleteStudent('${student._id}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorDiv.textContent = "";

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const course = document.getElementById("course").value.trim();

    if (!name) return errorDiv.textContent = "Name cannot be empty";
    if (!age || isNaN(age)) return errorDiv.textContent = "Age must be a number";
    if (!course) return errorDiv.textContent = "Course cannot be empty";

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, course })
    });

    if (res.ok) {
      form.reset();
      fetchStudents();
    } else {
      const err = await res.json();
      errorDiv.textContent = err.error;
    }
  });

  window.deleteStudent = async (id) => {
    if (confirm("Press OK to confirm deletion, Cancel to abort.")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchStudents();
    }
  };

  window.editStudent = async (id) => {
    const name = prompt("Enter new name:");
    const age = prompt("Enter new age:");
    const course = prompt("Enter new course:");
    if (!name || !age || isNaN(age) || !course) {
      alert("Invalid input");
      return;
    }
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, course })
    });
    fetchStudents();
  };

  fetchStudents();
});
