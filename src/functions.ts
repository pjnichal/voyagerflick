import { SayHelloProps } from "./types/types";

export function sayHello({firstname ,lastname,age}:SayHelloProps){
    console.log('hello')
    console.log(firstname);
    if(lastname){
        console.log(lastname);
    }
    if(age){
        console.log(age);
    }
}