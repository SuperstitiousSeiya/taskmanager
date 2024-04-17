import connection from "../../config/sqlconfig";
import { User, authUser } from "./user.types";




async function loginUser(user: authUser, callback: (user: User | [], error?: any) => void){

    const [result]: any = await connection.query("SELECT * FROM users WHERE (email= ? AND username=?) AND (password= ?)", [user.username, user.password]);
    console.log(result)



    if(result.length > 0){
        callback(result[0]);
    }
    else{
        const error = new Error("Invalid username or password")
        callback([], error);
    }

}

async function createUser(){

}


async function updateUser(){

}


async function deleteUser(){

}

export { loginUser, createUser, updateUser, deleteUser };