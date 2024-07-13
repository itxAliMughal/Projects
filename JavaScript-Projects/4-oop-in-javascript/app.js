//oop stands for object oriented programming

//every thing is object in javascript

//object literal
const muzammil = {
  name: "Muzammil Mustaqeem",
  age: 27,
};

// console.log(muzammil);

//we can create same object using functions
function personOne() {
  //this refer to current function
  this.name = "Muzammil Mustaqeem";
  this.age = 27;
  this.birthday = "27-11-1996";
}

const sameObject = new personOne();   // is ko initializize karate he

// console.log(sameObject);

//constructor functions

// new personOne(); = you are initializing the function

function PersonTwo(name, age, birthday) {
  this.name = name;
  this.age = age;
  this.birthday = birthday;

  this.calculateAge = function () {
    const difference = Date.now() - this.birthday.getTime();
    const ageDate = new Date(difference);
    //absolute value + wali
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
}

const person = new PersonTwo("Muzammil", 27, "1996-11-27");

console.log(person, "person");

//create object using class
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age; //class properties
  }

  hello() {
    //class methods
    return "hello";
  }

  checkName() {
    return this.name;
  }
  
}

const personClass = new PersonClass("Muzammil Mustaqeem", 27); //initialize
const hello = personClass.hello();
const checkName = personClass.checkName();

// console.log({ personClass, hello, checkName });

//static methods in class
// when you use the static method you will not need to initialize the class
class PersonFour {
  static genericHello() {
    return "Hello Checking";
  }
}

PersonFour.genericHello(); //call function without initialize

//Four Pillars In OOP

/*
Inheritance = Wirasat
Abstraction = Chupa wa
Polymorphism = talk with multiple
Encapsulation = properties wali chizen public/private

in javascript one more thing Prototype Inheritance
*/

// Inheritance Wirasat وراثت

class Parent {
  motherLanguage() {
    return "Urdu";
  }
}

class Children extends Parent {} //

const children = new Children();
children.motherLanguage(); //or hamare pas ye function mujood nai hai children class mein

// PROTOTYPE INHERITANCE
//Object.prototype
//Children.prototype

//misal k toor par hamare pas array hai usk andar hmare pas foreach ka method hota hai

//wo forEach or is jaise dusre methods

//wo prototype inheritance k zariye ate hein

const exampleArr = [];

console.log(exampleArr.__proto__, "proto proto"); //we have all methods from prototype inheritance
// exampleArr.__proto__.forEach

//create custom prototype function
function PersonProto(firstName, lastName, dob) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.dob = dob;
  // this.calculateAge = function () {
  //   const diff = Date.now() - this.birthday.getTime();
  //   const ageDate = new Date(diff);
  //   return Math.abs(ageDate.getUTCFullYear() - 1970);
  // };
}

// {firstName: "Muzammil"}
PersonProto.prototype.calculateAge = function () {
  console.log("calculate age function is working");
  // const diff = Date.now() - this.birthday.getTime();
  // const ageDate = new Date(diff);
  // return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const check = new PersonProto("Muzammil", "Mustaqeem", "1996-11-27");
console.log(check, "check");
// console.log(check.__proto__.calculateAge(), "check");
check.calculateAge();

//Accessing parent function method in prototype functions

function Person2(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
// {firstName:"Muzammil",lastName:"lastName"}
Person2.prototype.greeting = function () {
  return `Hello there my name is ${this.firstName} ${this.lastName}`;
};

// const person2 = new Person2("Muzammil", "Mustaqeem");
// console.log(person2.greeting());

function Customer(firstName, lastName, phone, membership) {
  Person2.call(this, firstName, lastName);
  this.phone = phone;
  this.membership = membership;
}

Customer.prototype = Object.create(Person2.prototype);

const customer1 = new Customer("Tom", "Smith", "555-555-5555", "Standard");

console.log(customer1, "customer1");
console.log(customer1.greeting(), "customer1.greeting()");

//Polymorphism
//ek class muliple class se connected ho

// Base class
class Animal {
  constructor(name) {
    this.name = name;
  }

  // Method to make a sound
  makeSound() {
    return "Generic animal sound";
  }
}

// Derived class 1
class Dog extends Animal {
  // Override the makeSound method for Dog
  makeSound() {
    return "Woof! Woof!";
  }

  // Additional method specific to Dog
  fetch() {
    return `${this.name} is fetching the ball.`;
  }
}

class Cat extends Animal {
  // Override the makeSound method for Cat
  makeSound() {
    return "Meow!";
  }

  // Additional method specific to Cat
  purr() {
    return `${this.name} is purring.`;
  }
}

// Example usage
const dog = new Dog("Buddy");
const cat = new Cat("Whiskers");

console.log(dog.name); // Output: Buddy
console.log(dog.makeSound()); // Output: Woof! Woof!
console.log(dog.fetch()); // Output: Buddy is fetching the ball.

console.log(cat.name); // Output: Whiskers
console.log(cat.makeSound()); // Output: Meow!
console.log(cat.purr()); // Output: Whiskers is purring.

//ek class animal ki multiple animalsClass se connect hai like cat or dog
