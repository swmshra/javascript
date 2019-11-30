console.log("Hello world")
//alert("yo")

var hello = "Hello World"

//                                  1. innerHTML
//document.getElementById('someText').innerHTML = hello;

//                                   2. prompt
//var age = prompt("What is your age?");
//document.getElementById("someText").innerHTML=age;  

//                                  3. Numbers : integer, float
// num++
// num += 10

//                                  4. Functions
/*function fun() {
    //alert('fun() called');
    console.log("Inside fun() function");
}
fun();*/

/*
function greeting(name) {
    var result = "Hello " + name;
    document.getElementById("someText").innerHTML = result;
}

var name = prompt("What is your name?");
greeting(name);
*/

//                                  5. while loops and for loops
var itr=10
/*
while(itr-->=0){
    console.log(itr); 
}
*/
/*
for(let num=0;num<=10;num++) {
    console.log(num);
}
*/

/*
//                                  6. Data type
let age = 18;                           //Number
let name = "Swaraj";                    //String
let id = {name:"Swaraj",age:18};        //Object
let female = false;                  //boolean
let marks = [10,20,30];                 //array
let wife = null;
let random;                            //undefined
*/

//                                  6. Strings
/*
let name = 'Alice';
let people = 'Alice\nBob';
console.log(people);

people.length();
people.indexOf('ice');
people.slice(2,5);
*/

//                                  7. Arrays
/*
let fruits = ['apple','banana','pineapple','papaya'];
//let fruits = new Array('apple','banana','pineapple','papaya');
for(let i=0;i<fruits.length;i++){
    console.log(fruits[i]);
}
console.log(fruits.toString())
console.log(fruits.join(" and "));

let vegetables = ['tomato','potato','onion'];

fruits = fruits.concat(vegetables);
console.log(fruits);

let nums = [4,3,6,1,7,8,9,4,2,,6];
console.log(nums.sort(function(a,b){return a-b}));
*/

//                                  8. Object
let student = {
    first: 'Swaraj',
    last:'Mishra',
    age: 22,
    gender: 'Male',
    studentInfo : function() {
        return this.first + ' ' + this.last;
    }
};
console.log(student);
student.first = 'Suraj';
console.log(student.studentInfo());
