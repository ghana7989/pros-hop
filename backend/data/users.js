import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin Babai",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 12),
        isAdmin: true,
    },
    {
        name: "Gow Babai",
        email: "gow@gmail.com",
        password: bcrypt.hashSync("123456", 12),
    },
    {
        name: "Hem Babai",
        email: "hem@gmail.com",
        password: bcrypt.hashSync("123456", 12),
    },
];


export default users;