import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import * as bootstrap from "bootstrap";
import "@popperjs/core";
import { l, p, password, s, SERVER_URL } from "./constants";

document.getElementById("all-content").style.display = "block";

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Person below */



/* HER STARTER PUT/DELETE PERSON */

let editModalElement = document.getElementById("editmodal");
let editMoadl = new bootstrap.Modal(editModalElement);

document.getElementById("tablerows").addEventListener("click", (e) => {
  e.preventDefault();
  const node = e.target;
  console.log(node);
  const name = node.getAttribute("name");
  const id = node.getAttribute("id");
  switch (name) {
    case "edit":
      editPerson(id);
      break;
    case "delete":
      deletePerson(id);
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
      document.getElementById("email").value = data.dto_email;
      document.getElementById("phone").value = data.dto_phones
        .map((el) => el.dto_number)
        .join("");
      document.getElementById("street").value = data.dto_street;
      document.getElementById("zip").value = data.dto_zipCode;
      document.getElementById("city").value = data.dto_city;
      document.getElementById("hobby").value = data.dto_hobbies
        .map((el) => el.dto_name)
        .join("");
      console.log("Kig her" + data);
      document.getElementById("address_id").value = data.dto_address_id;
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
  console.log(document.getElementById("fName").value);

  const personObject = {
    dto_id: id,
    dto_fName: document.getElementById("fName").value,
    dto_lName: document.getElementById("lName").value,
    dto_email: document.getElementById("email").value,
    dto_phones: [
      { dto_number: document.getElementById("phone").value, dto_person: id },
    ],
    dto_street: document.getElementById("street").value,
    dto_zipCode: document.getElementById("zip").value,
    dto_city: document.getElementById("city").value,
    dto_hobbies: [
      {
        dto_name: document.getElementById("hobby").value,
      },
    ],
  };

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
  const deleteperson = makeOptions("DELETE");

  if (document.getElementById("psw").value === password + l + p + s) {
    fetch(`${SERVER_URL}/person/` + id, deleteperson)
      .then(handleHttpErrors)
      .then((removed) => {
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
}

/* HER SLUTTER PUT/DELETE PERSON */

/* HER STARTER GETSINGLEPERSON */

let getSinglePersonModalElement = document.getElementById("singlePersonmodal");
let singlePersonMoadl = new bootstrap.Modal(getSinglePersonModalElement);

document.getElementById("singleIdBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const node = e.target;
  const name = node.getAttribute("name");
  const id = document.getElementById("singel_id").value;
  switch (name) {
    case "getSinglePerson":
      getSinglePerson(id);
      document.getElementById("singel_id").value = null;
      break;
  }
});

function getSinglePerson(id) {
  fetch(`${SERVER_URL}/person/` + id)
    .then(handleHttpErrors)
    .then((data) => {
      document.getElementById("sedit_id").value = data.dto_id;
      document.getElementById("sfName").value = data.dto_fName;
      document.getElementById("slName").value = data.dto_lName;
      document.getElementById("semail").value = data.dto_email;
      document.getElementById("sphone").value = data.dto_phones
        .map((el) => el.dto_number)
        .join("");
      document.getElementById("sstreet").value = data.dto_street;
      document.getElementById("szip").value = data.dto_zipCode;
      document.getElementById("scity").value = data.dto_city;
      document.getElementById("shobby").value = data.dto_hobbies
        .map((el) => el.dto_name)
        .join("");
      document.getElementById("saddress_id").value = data.dto_address_id;
      singlePersonMoadl.toggle();
    })
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

/* HER SLUTTER GETSINGLEPERSON */

/* HER STARTER POST PERSON */

let postModalElement = document.getElementById("postmodal");
let postMoadl = new bootstrap.Modal(postModalElement);

document.getElementById("POSTPersonBtn").addEventListener("click", (e) => {
  e.preventDefault();
  (document.getElementById("pfName").value = ""),
    (document.getElementById("plName").value = ""),
    (document.getElementById("pemail").value = ""),
    (document.getElementById("pphone").value = ""),
    (document.getElementById("pstreet").value = ""),
    (document.getElementById("pzip").value = ""),
    (document.getElementById("pcity").value = ""),
    (document.getElementById("phobby").value = ""),
    postMoadl.toggle();
});

document
  .getElementById("modal-create-btn")
  .addEventListener("click", postNewPerson);

function postNewPerson() {
  let personObjectPost = {
    dto_fName: document.getElementById("pfName").value,
    dto_lName: document.getElementById("plName").value,
    dto_email: document.getElementById("pemail").value,
    dto_phones: [{ dto_number: document.getElementById("pphone").value }],
    dto_street: document.getElementById("pstreet").value,
    dto_zipCode: document.getElementById("pzip").value,
    dto_city: document.getElementById("pcity").value,
    dto_hobbies: [
      {
        dto_name: document.getElementById("phobby").value,
      },
    ],
  };

  const postPerson = makeOptions("POST", personObjectPost);
  fetch(`${SERVER_URL}person/`, postPerson)
    .then(handleHttpErrors)
    .then((data) => {
      postMoadl.toggle();
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

/* HER SLUTTER POST PERSON */

/* HER STARTER GETALLPERSONS */

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
  <input id="${
    p.dto_id
  }" type="button" name="edit" value="edit" style="background-color: blue; color: white;" />
  <input id="${
    p.dto_id
  }" type="button" name="delete" value="delete" style="background-color: red; color: white;"/>
  
  <input type="password" id="psw" name="psw" pattern="(?=.*\d.{4,})" required>
  <label for="psw">Password for delete</label>
  </td>
  </tr>`;
}

/* HER SLUTTER GETALLPERSONS */

/* JS For Hobbies below */

function getAllHobbies() {
  fetch(`${SERVER_URL}/hobby/all`)
    .then(handleHttpErrors)
    .then((data) => {
      const allHobbyRows = data.all.map((h) => getHobbiesTableRow(h));
      document.getElementById("hobbytablerows").innerHTML =
        allHobbyRows.join("");
    })
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function getHobbiesTableRow(h) {
  return `<tr>
<td>${h.dto_name}</td>
<td>${h.dto_category}</td>
<td>${h.dto_type}</td>
<td>${h.dto_wikiLink}</td>
</tr>`;
}

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
  document.getElementById("hobbies_html").style = "display:none";
  document.getElementById("ex3_html").style = "display:none";
  document.getElementById(idToShow).style = "display:block";
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "person":
      hideAllShowOne("person_html");
      getAllPersons();
      break;
    case "hobbies":
      hideAllShowOne("hobbies_html");
      getAllHobbies();
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
