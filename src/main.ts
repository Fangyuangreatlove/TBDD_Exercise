console.log("\n================ BÀI 01 ================\n");
{
class Person {
  constructor(public name: string, public age: number) {}

  displayInfo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

const person = new Person("An", 20);
person.displayInfo();
}

console.log("\n================ BÀI 02 ================\n");
{
class Person {
  constructor(public name: string, public age: number) {}

  displayInfo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

class Student extends Person {
  constructor(name: string, age: number, public grade: number) {
    super(name, age);
  }

  displayAllInfo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
  }
}

const student = new Student("Binh", 20, 8.5);
student.displayAllInfo();
}

console.log("\n================ BÀI 03 ================\n");
{
class Car {
  constructor(
    public brand: string,
    public model: string,
    public year: number
  ) {}

  showInfo(): void {
    console.log(`Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`);
  }
}

const car = new Car("Toyota", "Camry", 2024);
car.showInfo();
}

console.log("\n================ BÀI 04 ================\n");
{
class Rectangle {
  constructor(public width: number, public height: number) {}

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }

  displayInfo(): void {
    console.log(`Area: ${this.area()}`);
    console.log(`Perimeter: ${this.perimeter()}`);
  }
}

const rectangle = new Rectangle(5, 3);
rectangle.displayInfo();
}

console.log("\n================ BÀI 05 ================\n");
{
class BankAccount {
  constructor(public balance: number = 0) {}

  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount must be greater than 0.");
      return;
    }
    this.balance += amount;
    console.log(`Deposited: ${amount}. Balance: ${this.balance}`);
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      console.log("Withdrawal amount must be greater than 0.");
      return;
    }
    if (amount > this.balance) {
      console.log("Insufficient balance.");
      return;
    }
    this.balance -= amount;
    console.log(`Withdrawn: ${amount}. Balance: ${this.balance}`);
  }
}

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(300);
}

console.log("\n================ BÀI 06 ================\n");
{
class Book {
  constructor(
    public title: string,
    public author: string,
    public year: number
  ) {}

  displayInfo(): void {
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author}`);
    console.log(`Year: ${this.year}`);
  }
}

const book = new Book("Clean Code", "Robert C. Martin", 2008);
book.displayInfo();
}

console.log("\n================ BÀI 07 ================\n");
{
class User {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (value.trim() === "") {
      console.log("Name cannot be empty.");
      return;
    }
    this._name = value;
  }
}

const user = new User("Lan");
console.log("Name:", user.name);

user.name = "Mai";
console.log("Updated name:", user.name);
}

console.log("\n================ BÀI 08 ================\n");
{
class Product {
  constructor(public name: string, public price: number) {}
}

const products: Product[] = [
  new Product("Mouse", 50),
  new Product("Keyboard", 120),
  new Product("Monitor", 300),
  new Product("USB Cable", 20),
];

const filteredProducts = products.filter(product => product.price > 100);

console.log("Products with price > 100:");
filteredProducts.forEach(product => {
  console.log(`${product.name}: $${product.price}`);
});
}

console.log("\n================ BÀI 09 ================\n");
{
interface Animal {
  name: string;
  sound(): void;
}

class Dog implements Animal {
  constructor(public name: string) {}

  sound(): void {
    console.log(`${this.name}: Woof!`);
  }
}

class Cat implements Animal {
  constructor(public name: string) {}

  sound(): void {
    console.log(`${this.name}: Meow!`);
  }
}

const dog = new Dog("Buddy");
const cat = new Cat("Mimi");

dog.sound();
cat.sound();
}

console.log("\n================ BÀI 10 ================\n");
{
class Account {
  public accountName: string;
  private balance: number;
  readonly accountId: string;

  constructor(accountName: string, balance: number, accountId: string) {
    this.accountName = accountName;
    this.balance = balance;
    this.accountId = accountId;
  }

  showInfo(): void {
    console.log(`Name: ${this.accountName}`);
    console.log(`Balance: ${this.balance}`);
    console.log(`ID: ${this.accountId}`);
  }
}

const account = new Account("Nguyen Van A", 5000, "ACC001");
account.showInfo();

// account.balance = 10000; // Error: private
// account.accountId = "ACC002"; // Error: readonly
}

console.log("\n================ BÀI 11 ================\n");
{
class Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log("Animal makes a sound.");
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name}: Woof!`);
  }
}

class Cat extends Animal {
  meow(): void {
    console.log(`${this.name}: Meow!`);
  }
}

const dog = new Dog("Rex");
const cat = new Cat("Tom");

dog.bark();
cat.meow();
}

console.log("\n================ BÀI 12 ================\n");
{
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Bird implements Flyable, Swimmable {
  fly(): void {
    console.log("Bird is flying.");
  }

  swim(): void {
    console.log("Bird is swimming.");
  }
}

class Fish implements Swimmable {
  swim(): void {
    console.log("Fish is swimming.");
  }
}

const bird = new Bird();
bird.fly();
bird.swim();

const fish = new Fish();
fish.swim();
}

console.log("\n================ BÀI 13 ================\n");
{
abstract class Shape {
  abstract area(): number;
}

class Square extends Shape {
  constructor(private side: number) {
    super();
  }

  area(): number {
    return this.side * this.side;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

const square = new Square(4);
const circle = new Circle(3);

console.log("Square area:", square.area());
console.log("Circle area:", circle.area().toFixed(2));
}

console.log("\n================ BÀI 14 ================\n");
{
class Employee {
  constructor(public name: string, public salary: number) {}

  displayInfo(): void {
    console.log(`Employee: ${this.name}, Salary: ${this.salary}`);
  }
}

class Manager extends Employee {
  manage(): void {
    console.log(`${this.name} is managing the team.`);
  }
}

class Developer extends Employee {
  code(): void {
    console.log(`${this.name} is writing code.`);
  }
}

const manager = new Manager("Alice", 3000);
manager.displayInfo();
manager.manage();

const developer = new Developer("Bob", 2500);
developer.displayInfo();
developer.code();
}

console.log("\n================ BÀI 15 ================\n");
{
class Book {
  constructor(
    public title: string,
    public author: string,
    public year: number
  ) {}
}

class User {
  constructor(public name: string) {}
}

class Library {
  private books: Book[] = [];
  private users: User[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  displayInfo(): void {
    console.log("Books:");
    this.books.forEach(book =>
      console.log(`- ${book.title} by ${book.author} (${book.year})`)
    );

    console.log("Users:");
    this.users.forEach(user => console.log(`- ${user.name}`));
  }
}

const library = new Library();
library.addBook(new Book("The Hobbit", "J.R.R. Tolkien", 1937));
library.addBook(new Book("1984", "George Orwell", 1949));
library.addUser(new User("An"));
library.addUser(new User("Binh"));

library.displayInfo();
}

console.log("\n================ BÀI 16 ================\n");
{
class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberBox = new Box<number>(123);
const stringBox = new Box<string>("Hello TypeScript");

console.log("Number:", numberBox.getValue());
console.log("String:", stringBox.getValue());
}

console.log("\n================ BÀI 17 ================\n");
{
class Logger {
  private static instance: Logger;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

logger1.log("Application started.");
console.log("Same instance:", logger1 === logger2);
}

console.log("\n================ BÀI 18 ================\n");
{
class MathUtil {
  static add(a: number, b: number): number {
    return a + b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Cannot divide by zero.");
    }
    return a / b;
  }
}

console.log("Add:", MathUtil.add(10, 5));
console.log("Subtract:", MathUtil.subtract(10, 5));
console.log("Multiply:", MathUtil.multiply(10, 5));
console.log("Divide:", MathUtil.divide(10, 5));
}

console.log("\n================ BÀI 19 ================\n");
{
class Animal {
  makeSound(): void {
    console.log("Animal sound.");
  }
}

class Dog extends Animal {
  override makeSound(): void {
    console.log("Dog says: Woof!");
  }
}

class Cat extends Animal {
  override makeSound(): void {
    console.log("Cat says: Meow!");
  }
}

const animals: Animal[] = [new Dog(), new Cat(), new Animal()];

animals.forEach(animal => animal.makeSound());
}

console.log("\n================ BÀI 20 ================\n");
{
interface Vehicle {
  start(): void;
  stop(): void;
}

class Car implements Vehicle {
  start(): void {
    console.log("Car starts.");
  }

  stop(): void {
    console.log("Car stops.");
  }
}

class Bike implements Vehicle {
  start(): void {
    console.log("Bike starts.");
  }

  stop(): void {
    console.log("Bike stops.");
  }
}

const car = new Car();
car.start();
car.stop();

const bike = new Bike();
bike.start();
bike.stop();
}

console.log("\n================ BÀI 21 ================\n");
{
class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

const numberRepository = new Repository<number>();
numberRepository.add(10);
numberRepository.add(20);
numberRepository.add(30);

console.log("Numbers:", numberRepository.getAll());

const stringRepository = new Repository<string>();
stringRepository.add("A");
stringRepository.add("B");

console.log("Strings:", stringRepository.getAll());
}

console.log("\n================ BÀI 22 ================\n");
{
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const stack = new Stack<number>();

console.log("Is empty:", stack.isEmpty());

stack.push(10);
stack.push(20);
stack.push(30);

console.log("Peek:", stack.peek());
console.log("Pop:", stack.pop());
console.log("Peek after pop:", stack.peek());
console.log("Is empty:", stack.isEmpty());
}

console.log("\n================ BÀI 23 ================\n");
{
interface Payment {
  pay(amount: number): void;
}

class CashPayment implements Payment {
  pay(amount: number): void {
    console.log(`Paid ${amount} by cash.`);
  }
}

class CardPayment implements Payment {
  pay(amount: number): void {
    console.log(`Paid ${amount} by card.`);
  }
}

const cash = new CashPayment();
cash.pay(100);

const card = new CardPayment();
card.pay(250);
}

console.log("\n================ BÀI 24 ================\n");
{
abstract class Appliance {
  abstract turnOn(): void;
}

class Fan extends Appliance {
  turnOn(): void {
    console.log("Fan is turned on.");
  }
}

class AirConditioner extends Appliance {
  turnOn(): void {
    console.log("Air conditioner is turned on.");
  }
}

const fan = new Fan();
fan.turnOn();

const airConditioner = new AirConditioner();
airConditioner.turnOn();
}

console.log("\n================ BÀI 25 ================\n");
{
class Shape {
  static describe(): void {
    console.log("A shape is a geometric figure with a defined form.");
  }
}

Shape.describe();
}

console.log("\n================ BÀI 26 ================\n");
{
class Product {
  constructor(public name: string, public price: number) {}
}

class Order {
  constructor(public products: Product[] = []) {}

  calculateTotalPrice(): number {
    return this.products.reduce((total, product) => total + product.price, 0);
  }

  displayInfo(): void {
    console.log("Order:");
    this.products.forEach(product =>
      console.log(`- ${product.name}: $${product.price}`)
    );
    console.log(`Total: $${this.calculateTotalPrice()}`);
  }
}

const order = new Order([
  new Product("Laptop", 1000),
  new Product("Mouse", 50),
  new Product("Keyboard", 80),
]);

order.displayInfo();
}

console.log("\n================ BÀI 27 ================\n");
{
class Person {
  constructor(public name: string, public age: number) {}

  displayInfo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

class Teacher extends Person {
  constructor(
    name: string,
    age: number,
    public subject: string
  ) {
    super(name, age);
  }

  introduce(): void {
    console.log(
      `Hello, I am ${this.name}. I am ${this.age} years old and I teach ${this.subject}.`
    );
  }
}

const teacher = new Teacher("Ms. Hoa", 30, "TypeScript");
teacher.displayInfo();
teacher.introduce();
}

console.log("\n================ BÀI 28 ================\n");
{
class Animal {
  protected makeSound(): void {
    console.log("Animal makes a sound.");
  }

  public testSound(): void {
    this.makeSound();
  }
}

class Dog extends Animal {
  override makeSound(): void {
    console.log("Dog says: Woof!");
  }
}

class Cat extends Animal {
  override makeSound(): void {
    console.log("Cat says: Meow!");
  }
}

const dog = new Dog();
const cat = new Cat();

dog.testSound();
cat.testSound();
}

console.log("\n================ BÀI 29 ================\n");
{
interface Movable {
  move(): void;
}

class Car implements Movable {
  move(): void {
    console.log("Car is moving on the road.");
  }
}

class Robot implements Movable {
  move(): void {
    console.log("Robot is moving.");
  }
}

const car = new Car();
car.move();

const robot = new Robot();
robot.move();
}

console.log("\n================ BÀI 30 ================\n");
{
class Student {
  constructor(public name: string, public grade: number) {}
}

class Teacher {
  constructor(public name: string, public subject: string) {}
}

class School {
  constructor(
    private students: Student[] = [],
    private teachers: Teacher[] = []
  ) {}

  addStudent(student: Student): void {
    this.students.push(student);
  }

  addTeacher(teacher: Teacher): void {
    this.teachers.push(teacher);
  }

  displayInfo(): void {
    console.log("=== Students ===");
    this.students.forEach(student =>
      console.log(`- ${student.name}, Grade: ${student.grade}`)
    );

    console.log("=== Teachers ===");
    this.teachers.forEach(teacher =>
      console.log(`- ${teacher.name}, Subject: ${teacher.subject}`)
    );
  }
}

const school = new School();

school.addStudent(new Student("An", 10));
school.addStudent(new Student("Binh", 11));

school.addTeacher(new Teacher("Mr. Nam", "Mathematics"));
school.addTeacher(new Teacher("Ms. Lan", "English"));

school.displayInfo();
}
