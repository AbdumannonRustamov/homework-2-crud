const form = document.querySelector("#formSub") as HTMLFormElement;
const nameInput = document.querySelector("#name") as HTMLInputElement;
const ageInput = document.querySelector("#age") as HTMLInputElement;
const template = document.querySelector(".template") as HTMLTemplateElement;
const taskContainer = document.querySelector(".task")!;

type User = {
    name: string,
    age: number
}

const users: User[] = [];

function loadUsers(): User[] {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) as User[] : [];
}

function saveUsers(data: User[]) {
    localStorage.setItem('users', JSON.stringify(data));
}

function renderUsers(list: User[]) {
    taskContainer.innerHTML = '';
    list.forEach((user, i) => {
        const clone = template.content.cloneNode(true) as HTMLTemplateElement;

        const nameEl = clone.querySelector('.fname') as HTMLHeadElement;
        const ageEl = clone.querySelector('.agef') as HTMLHeadElement;
        const editBtn = clone.querySelector('.btn2') as HTMLButtonElement;
        const delBtn = clone.querySelector('.btn3') as HTMLButtonElement;

        nameEl.textContent = user.name;
        ageEl.textContent = user.age.toString();

        editBtn.addEventListener('click', () => {
            nameInput.value = user.name;
            ageInput.value = user.age.toString();
            users.splice(i, 1);
            saveUsers(users);
            renderUsers(users);
        });

        delBtn.addEventListener('click', () => {
            users.splice(i, 1);
            saveUsers(users);
            renderUsers(users);
        });

        taskContainer.appendChild(clone);
    });
}

users.push(...loadUsers());
renderUsers(users);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newUser: User = {
        name: nameInput.value,
        age: parseInt(ageInput.value)
    }

    if (newUser.name.trim() && !isNaN(newUser.age)) {
        users.push(newUser);
        saveUsers(users);
        renderUsers(users);
    }

    form.reset();
});
