import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin",
        email:"adming@example.com",
        password:bcrypt.hashSync("admin123",10),
        isAdmin: true
    },
    {
        name: "John",
        email:"john@doe.com",
        password:bcrypt.hashSync("123456",10),
    }

];

export default users;