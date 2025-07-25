let users = [];
let currentIndex = null;

function display(msg, color) {
  document.getElementById(
    "displaymsg"
  ).innerHTML = `<span style="color:${color}">${msg}</span>`;
}

function validateForm() {
  const fname = document.getElementById("first_name").value.trim();
  const lname = document.getElementById("last_name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("pass").value;
  const confpass = document.getElementById("confpass").value;
  const dob = document.getElementById("dob").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const picInput = document.getElementById("pic");
  const course = document.getElementById("course").value;
  const mode = document.querySelector('input[name="mode"]:checked')?.value;
  const joining = document.getElementById("joining_date").value;
  const duration = document.getElementById("duration").value;

  const namePattern = /^[A-Za-z ]+$/;
  const passPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!fname || !namePattern.test(fname))
    return display("Invalid First Name", "red");
  if (!lname || !namePattern.test(lname))
    return display("Invalid Last Name", "red");
  if (!mobile || isNaN(mobile) || mobile.length !== 10)
    return display("Invalid Mobile", "red");
  if (!email) return display("Email is required", "red");
  if (!pass || !passPattern.test(pass)) return display("Weak Password", "red");
  if (pass !== confpass) return display("Passwords do not match", "red");
  if (!dob) return display("Date of Birth is required", "red");
  if (!gender) return display("Select Gender", "red");
  if (!picInput.files[0]) return display("Upload Picture", "red");
  if (!course) return display("Select Course", "red");
  if (!mode) return display("Select Mode", "red");
  if (!joining) return display("Enter Joining Date", "red");
  if (!duration) return display("Select Course Duration", "red");

  const reader = new FileReader();
  reader.onload = function (e) {
    const newUser = {
      fname,
      lname,
      mobile,
      email,
      dob,
      gender,
      pic: e.target.result,
      course,
      mode,
      joining,
      duration,
    };
    users.push(newUser);
    renderTable();
    clearForm();
    display("User Registered Successfully", "green");
  };
  reader.readAsDataURL(picInput.files[0]);
}

function renderTable() {
  let html = "";
  users.forEach((user, i) => {
    html += `
      <tr>
        <td>${user.fname}</td>
        <td>${user.lname}</td>
        <td>${user.mobile}</td>
        <td>${user.email}</td>
        <td>${user.dob}</td>
        <td>${user.gender}</td>
        <td><img src="${user.pic}" /></td>
        <td>${user.course}</td>
        <td>${user.mode}</td>
        <td>${user.joining}</td>
        <td>${user.duration}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="EditUser(${i})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="DeleteUser(${i})">Delete</button>
        </td>
      </tr>
    `;
  });
  document.getElementById("table-body").innerHTML = html;
}

function EditUser(index) {
  const user = users[index];
  currentIndex = index;
  document.getElementById("first_name").value = user.fname;
  document.getElementById("last_name").value = user.lname;
  document.getElementById("mobile").value = user.mobile;
  document.getElementById("email").value = user.email;
  document.getElementById("dob").value = user.dob;
  document.querySelector(
    `input[name="gender"][value="${user.gender}"]`
  ).checked = true;
  document.getElementById("course").value = user.course;
  document.querySelector(
    `input[name="mode"][value="${user.mode}"]`
  ).checked = true;
  document.getElementById("joining_date").value = user.joining;
  document.getElementById("duration").value = user.duration;
}

function UpdateUser() {
  if (currentIndex === null) return;
  users[currentIndex].fname = document.getElementById("first_name").value;
  users[currentIndex].lname = document.getElementById("last_name").value;
  users[currentIndex].mobile = document.getElementById("mobile").value;
  users[currentIndex].email = document.getElementById("email").value;
  users[currentIndex].dob = document.getElementById("dob").value;
  users[currentIndex].gender = document.querySelector(
    'input[name="gender"]:checked'
  )?.value;
  users[currentIndex].course = document.getElementById("course").value;
  users[currentIndex].mode = document.querySelector(
    'input[name="mode"]:checked'
  )?.value;
  users[currentIndex].joining = document.getElementById("joining_date").value;
  users[currentIndex].duration = document.getElementById("duration").value;
  renderTable();
  clearForm();
  display("User Updated Successfully", "green");
}

function DeleteUser(index) {
  users.splice(index, 1);
  renderTable();
  display("User Deleted", "red");
}

function clearForm() {
  document.getElementById("myform").reset();
  currentIndex = null;
  document.getElementById("displaymsg").innerHTML = "";
}
