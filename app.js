"use strict";
const formsub = document.querySelector("#formSub");
const iname = document.querySelector("#name");
const iage = document.querySelector("#age");
const temp = document.querySelector(".template");
const task = document.querySelector(".task");
const users = [];
function getUsersFromLocalStorage() {
    const usersData = localStorage.getItem('users');
    if (usersData) {
        return JSON.parse(usersData);
    }
    return [];
}
function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function ToDoList(user) {
    task.innerHTML = '';
    user.forEach((item, index) => {
        const clone = temp.content.cloneNode(true);
        const par1 = clone.querySelector('.fname');
        const par2 = clone.querySelector('.agef');
        const editBtn = clone.querySelector('.btn2');
        const deleteBtn = clone.querySelector('.btn3');
        par1.textContent = item.name;
        par2.textContent = item.age.toString();
        editBtn.addEventListener('click', () => {
            iname.value = item.name;
            iage.value = item.age.toString();
            users.splice(index, 1);
            saveUsersToLocalStorage(users);
            ToDoList(users);
        });
        deleteBtn.addEventListener('click', () => {
            users.splice(index, 1);
            saveUsersToLocalStorage(users);
            ToDoList(users);
        });
        task.appendChild(clone);
    });
}
const usersFromStorage = getUsersFromLocalStorage();
users.push(...usersFromStorage);
ToDoList(users);
formsub.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = {
        name: iname.value,
        age: parseInt(iage.value)
    };
    if (iname.value.trim() && !isNaN(iage.valueAsNumber)) {
        users.push(user);
        saveUsersToLocalStorage(users);
        ToDoList(users);
    }
    formsub.reset();
});
