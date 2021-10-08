import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import * as bootstrap from "bootstrap";
import "@popperjs/core";
import { SERVER_URL } from "./constants";

document.getElementById("all-content").style.display = "block";

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Person below */

let editModalElement = document.getElementById("editmodal");
let editMoadl = new bootstrap.Modal(editModalElement);

document.getElementById("tablerows").addEventListener("click", (e) => {
  e.preventDefault();
  const node = e.target;
  const name = node.getAttribute("name");
  const id = node.getAttribute("id");
  switch (name) {
    case "edit":
      editPerson(id);
      break;
    case "delete":
      deletePerson(id);
      break;
    case "getsingle person":
      getSinglePerson(id);
      break;
  }
});

function editPerson(id) {
  fetch(`${SERVER_URL}/person/` + id)
    .then(handleHttpErrors)
    .then((data) => {
      document.getElementById("edit_id").value = data.dto_id;
      document.getElementById("fName").value = data.dto_fName;
      document.getElementById("lName").value = data.dto_lName;
      document.getElementById("phone").value = data.dto_phones.map(
        (el) => el.dto_number
      );
      document.getElementById("street").value = data.dto_street;
      document.getElementById("zip").value = data.dto_zipCode;
      document.getElementById("city").value = data.dto_city;
      document.getElementById("hobby").value = data.dto_hobbies.map(
        (el) => el.dto_name
      );
      editMoadl.toggle();
    })
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

document
  .getElementById("modal-edit-save-btn")
  .addEventListener("click", updatePerson);

function updatePerson() {
  const id = document.getElementById("edit_id").value;
  // const nummer = document.getElementById("phoen")


  const personObject = {
    dto_id: id,
    dto_fName: document.getElementById("fName").value,
    dto_lName: document.getElementById("lName").value,
    dto_phones: [document.getElementById("phone").value],
    dto_street: document.getElementById("street").value,
    dto_zipCode: document.getElementById("zip").value,
    dto_city: document.getElementById("city").value,
    dto_hobbies: [document.getElementById("hobby").value],
  };

  console.log(personObject); //her
  const options = makeOptions("PUT", personObject);

  fetch(`${SERVER_URL}person/${id}`, options)
    .then(handleHttpErrors)
    .then((data) => {
      editMoadl.toggle();
      getAllPersons();
    })
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function deletePerson(id) {
  alert("delete person: " + id);
}

function getAllPersons() {
  fetch(`${SERVER_URL}/person/all`)
    .then(handleHttpErrors)
    .then((data) => {
      const allRows = data.all.map((p) => getPersonTableRow(p));
      document.getElementById("tablerows").innerHTML = allRows.join("");
    })
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function getPersonTableRow(p) {
  return `<tr>
  <td>${p.dto_id}</td>
  <td>${p.dto_fName}</td>
  <td>${p.dto_lName}</td>
  <td>${p.dto_phones.map((el) => el.dto_number).join(", ")}</td>
  <td>${p.dto_street}</td>
  <td>${p.dto_zipCode}</td>
  <td>${p.dto_city}</td>
  <td>${p.dto_hobbies.map((el) => el.dto_name).join("")}</td>
  <td> 
  <input id="${p.dto_id}" type="button" name="edit" value="edit"/>
  <input id="${p.dto_id}" type="button" name="delete" value="delete"/>
  </td>
  </tr>`;
}

/* JS For Exercise-2 below */

/* JS For Exercise-3 below */

/* Helper functions */

function makeOptions(method, body) {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none";
  document.getElementById("person_html").style = "display:none";
  document.getElementById("ex2_html").style = "display:none";
  document.getElementById("ex3_html").style = "display:none";
  document.getElementById(idToShow).style = "display:block";
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1":
      hideAllShowOne("person_html");
      getAllPersons();
      break;
    case "ex2":
      hideAllShowOne("ex2_html");
      break;
    case "ex3":
      hideAllShowOne("ex3_html");
      break;
    default:
      hideAllShowOne("about_html");
      break;
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");
