var employeeList = [
  {
    name: 'Jan',
    officeNum: 1,
    phoneNum: '222-222-2222'
  },
  {
    name: 'Juan',
    officeNum: 304,
    phoneNum: '489-789-8789'
  },
  {
    name: 'Margie',
    officeNum: 789,
    phoneNum: '789-789-7897'
  },
  {
    name: 'Sara',
    officeNum: 32,
    phoneNum: '222-789-4654'
  },
  {
    name: 'Tyrell',
    officeNum: 3,
    phoneNum: '566-621-0452'
  },
  {
    name: 'Tasha',
    officeNum: 213,
    phoneNum: '789-766-5675'
  },
  {
    name: 'Ty',
    officeNum: 211,
    phoneNum: '789-766-7865'
  },
  {
    name: 'Sarah',
    officeNum: 345,
    phoneNum: '222-789-5231'
  }
];

var activeList = [];
const employee = $('#displayboard');

const render = function(array) {
  if (!Array.isArray(array)) {
    employee.append(`<div class='render'>${array.name}</div>`);
    employee.append(`<div class='render'>${array.officeNum}</div>`);
    employee.append(`<div class='render'>${array.phoneNum}</div>`);
    return;
  }

  for (let i = 0; i < array.length; i++) {
    employee.append(`<div class='render'>${array[i].name}</div>`);
    employee.append(`<div class='render'>${array[i].officeNum}</div>`);
    employee.append(`<div class='render'>${array[i].phoneNum}</div>`);
    employee.append(`<br>`);
  }
}

// print all array objects
const printEmp = function () {
  event.preventDefault();
  employee.empty();
  render(employeeList);
}

$('#print').on('click', printEmp);


// verify employee name 
const runVerify = function () {
  event.preventDefault();
  const input = $('#verifyinput').val();
  msg = "Employee not found";
  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].name.toLowerCase() === input.toLowerCase()) {
      msg = "Employee found";
    }
  }
  employee.append(msg);
}

const verifyEmp = function () {
  event.preventDefault();
  employee.empty();
  employee.append(`<div><form>
  <input type="text" id="verifyinput" placeholder="employee name" autocomplete="off" />
  <button id="verifysubmit">Verify</button>
  </form></div>`);
  $('#verifysubmit').on('click', runVerify);
}

$('#verify').on('click', verifyEmp);

//lookup employee information
const runLookup = function () {
  event.preventDefault();
  activeList = [];
  const input = $('#lookupinput').val();
  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].name.toLowerCase() === input.toLowerCase()) {
      activeList.push(employeeList[i]);
    }
  }
  if (activeList.length !== 0) {
    render(activeList);
  }
  else {
    employee.append('Employee Not Found');
  }
}

const lookupEmp = function () {
  event.preventDefault();
  employee.empty();
  employee.append(`<div><form>
  <input type="text" id="lookupinput" placeholder="employee name" autocomplete="off" />
  <button id="lookupsubmit">Lookup</button>
  </form></div>`);
  $('#lookupsubmit').on('click', runLookup);
}

$('#lookup').on('click', lookupEmp);

//contains - prints all employee info if contains string
const runContains = function () {
  event.preventDefault();
  activeList = [];
  const input = $('#containsinput').val();
  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].name.toLowerCase().includes(input.toLowerCase())) {
      activeList.push(employeeList[i]);
    }
  }
  if (activeList.length !== 0) {
    render(activeList);
  }
  else {
    employee.append('Employees Not Found');
  }
}

const containsEmp = function () {
  event.preventDefault();
  employee.empty();
  employee.append(`<div><form>
  <input type="text" id="containsinput" placeholder="partial employee name" autocomplete="off" />
  <button id="containsubmit">Contains</button>
  </form></div>`);
  $('#containsubmit').on('click', runContains);
}

$('#contains').on('click', containsEmp);

//update - prompt for name, let user update field, print new info
const runUpdate = function () {
  event.preventDefault();
  var found = false;
  const nameinput = $('#nameinput').val();
  const numberinput = $('#numberinput').val();
  const phoneinput = $('#phoneinput').val();
  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].name.toLowerCase() === nameinput.toLowerCase()) {
      employeeList[i].officeNum = numberinput;
      employeeList[i].phoneNum = phoneinput;
      render(employeeList[i]);
      found = true;
      break;
    }
  }
  if (!found) {
    employee.append('Employee Not Found');
  }
}

const updateEmp = function () {
  event.preventDefault();
  employee.empty();
  employee.append(`<div><form>
  <label for="nameinput">Name</label><input type="text" id="nameinput" placeholder="employee name" autocomplete="off" /><br>
  <label for="numberinput">Number</label><input type="text" id="numberinput" placeholder="employee office number" autocomplete="off" /><br>
  <label for="phoneinput">Phone</label><input type="text" id="phoneinput" placeholder="employee phone number" autocomplete="off" /><br>
  <button id="updatesubmit">Update</button>
  </form></div>`);
  $('#updatesubmit').on('click', runUpdate);
}

$('#update').on('click', updateEmp);


// add employee info to list
const runAdd = function () {
  event.preventDefault();
  activeList = {
    name: '',
    officeNum: '',
    phoneNum: ''
  };
  activeList.name = $('#nameinput').val();
  activeList.officeNum = $('#numberinput').val();
  activeList.phoneNum = $('#phoneinput').val();

  render(activeList);
  employeeList.push(activeList);
}

const addEmp = function () {
  event.preventDefault();
  employee.empty();
  employee.append(`<div><form>
  <label for="nameinput">Name</label><input type="text" id="nameinput" placeholder="employee name" autocomplete="off" /><br>
  <label for="numberinput">Number</label><input type="text" id="numberinput" placeholder="employee office number" autocomplete="off" /><br>
  <label for="phoneinput">Phone</label><input type="text" id="phoneinput" placeholder="employee phone number" autocomplete="off" /><br>
  <button id="addsubmit">Add</button>
  </form></div>`);
  $('#addsubmit').on('click', runAdd);
}

$('#add').on('click', addEmp);

// delete object from array
const runDelete = function () {
  event.preventDefault();
  var found = false;
  const input = $('#deleteinput').val();
  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].name.toLowerCase() === input.toLowerCase()) {
      employeeList.splice(i, 1);
      employee.append('Employee Deleted');
      found = true;
      break;
    }
  }
  if (!found) {
    employee.append('Employee Not Found');
  }
}

const deleteEmp = function () {
  event.preventDefault();
  employee.empty();
  employee.append(`<div><form>
  <input type="text" id="deleteinput" placeholder="employee name" autocomplete="off" />
  <button id="deletesubmit">Delete</button>
  </form></div>`);
  $('#deletesubmit').on('click', runDelete);
}

$('#delete').on('click', deleteEmp);


