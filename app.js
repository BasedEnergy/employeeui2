const state = {
    employeeList: [
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
    ],
    last: ''
}

const render = function (input) {
    $('#list').append(input);
}

const renderEmployee = function (employee) {
    $('#list').append(employee.name);
    $('#list').append('<br>');
    $('#list').append(employee.officeNum);
    $('#list').append('<br>');
    $('#list').append(employee.phoneNum);
    $('#list').append('<br><br>');
}

const runCommand = function (command) {
    event.preventDefault();

    $('#list').empty();

    let userName = '';
    let userNumber = '';
    let userPhone = '';
    let list = [];
    let emp = '';

    switch (command) {
        case 'print':
            state.employeeList.forEach(e => renderEmployee(e));
            break;
        case 'verify':
            userName = $('#verifyinput').val();
            render(state.employeeList.some(e => e.name.toLowerCase() === userName.toLowerCase()) ? 'Employee found' : 'Employee not found');
            break;
        case 'lookup':
            userName = $('#lookupinput').val();
            emp = state.employeeList.find(e => e.name.toLowerCase() === userName.toLowerCase());
            if (typeof emp !== 'undefined') {
                renderEmployee(emp);
            }
            else {
                render('Employee not found');
            }
            break;
        case 'contains':
            userName = $('#containsinput').val();
            state.employeeList.forEach(e => e.name.toLowerCase().includes(userName.toLowerCase()) ? list.push(e) : '');
            if (list.length !== 0) {
                list.forEach(e => renderEmployee(e));
            }
            else {
                render('Employee not found');
            }
            break;
        case 'update':
            userName = $('#updatenameinput').val();
            userNumber = $('#updatenumberinput').val();
            userPhone = $('#updatephoneinput').val();
            emp = state.employeeList.find(e => e.name.toLowerCase() === userName.toLowerCase());
            if (typeof emp !== 'undefined') {
                emp.officeNum = userNumber;
                emp.phoneNum = userPhone;
                renderEmployee(emp);
            }
            else {
                render('Employee not found');
            }
            break;
        case 'add':
            userName = $('#addnameinput').val();
            emp = state.employeeList.find(e => e.name.toLowerCase() === userName.toLowerCase());
            if (typeof emp === 'undefined') {
                emp = {
                    name: '',
                    officeNum: '',
                    phoneNum: ''
                };
                emp.name = $('#addnameinput').val();
                emp.officeNum = $('#addnumberinput').val();
                emp.phoneNum = $('#addphoneinput').val();
                renderEmployee(emp);
                state.employeeList.push(emp);
            }
            else {
                render('Employee already exists');
            }
            break;
        case 'delete':
            userName = $('#deleteinput').val();
            emp = state.employeeList.find(e => e.name.toLowerCase() === userName.toLowerCase());
            if (typeof emp !== 'undefined') {
                let index = state.employeeList.indexOf(emp);
                state.employeeList.splice(index, 1);
                render('Employee Deleted');
            }
            else {
                render('Employee not found');
            }
            break;
    }
}

const show = function (id) {
    if (state.last !== '' && state.last !== 'print') {
        $('#' + state.last + 'form').removeClass('show');
    }

    $('#list').empty();

    state.last = id;

    if (id === 'print') {
        runCommand(id);
    }
    else {
        $('#' + state.last + 'form').addClass('show');
    }
}

$('#print').on('click', function () { show('print') });
$('#verify').on('click', function () { show('verify') });
$('#lookup').on('click', function () { show('lookup') });
$('#contains').on('click', function () { show('contains') });
$('#update').on('click', function () { show('update') });
$('#add').on('click', function () { show('add') });
$('#delete').on('click', function () { show('delete') });

$('#verifysubmit').on('click', function () { runCommand('verify') });
$('#lookupsubmit').on('click', function () { runCommand('lookup') });
$('#containssubmit').on('click', function () { runCommand('contains') });
$('#updatesubmit').on('click', function () { runCommand('update') });
$('#addsubmit').on('click', function () { runCommand('add') });
$('#deletesubmit').on('click', function () { runCommand('delete') });