const formsub = document.querySelector("#formSub") as HTMLFormElement;
const iname = document.querySelector("#name") as HTMLInputElement;
const iage = document.querySelector("#age") as HTMLInputElement;
const temp = document.querySelector(".template") as HTMLTemplateElement;
const task = document.querySelector(".task")!

type User = {
    name: string,
    age: number
}

const users: User[] = [];
function getUsersFromLocalStorage() {
    const usersData = localStorage.getItem('users');
    if (usersData) {
        return JSON.parse(usersData) as User[];
    }
    return [];
}

function saveUsersToLocalStorage(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
}

function ToDoList(user: User[]) {
    task.innerHTML = '';
    user.forEach((item, index) => {
        const clone = temp.content.cloneNode(true) as HTMLTemplateElement;

        const par1 = clone.querySelector('.fname') as HTMLHeadElement;
        const par2 = clone.querySelector('.agef') as HTMLHeadElement;
        const editBtn = clone.querySelector('.btn2') as HTMLButtonElement;
        const deleteBtn = clone.querySelector('.btn3') as HTMLButtonElement;

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
    })
}


const usersFromStorage = getUsersFromLocalStorage();
users.push(...usersFromStorage);
ToDoList(users);

formsub.addEventListener('submit', (e) => {
    e.preventDefault();

    const user: User = {
        name: iname.value,
        age: parseInt(iage.value)
    }

    if (iname.value.trim() && !isNaN(iage.valueAsNumber)) {
        users.push(user);
        saveUsersToLocalStorage(users);  
        ToDoList(users);
    }

    formsub.reset();  
})