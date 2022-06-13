import './styles/index.scss';

const person = {
    name: "Akash",
    age: "29",
    profession: "developer"
}

const person2 = {
    ...person,
    email: "test@gmail.com"
}

console.log(person);
console.log(person2);