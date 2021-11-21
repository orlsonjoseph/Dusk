
class Stack {
    constructor() {
        this.elements = []; }

    enqueue(e) {
        this.elements.push(e); }

    // Remove element from front of stack
    dequeue(e) {
        return this.elements.pop(); }

    // Check if stack is empty
    isEmpty() {
        return this.length() == 0; }

    // Get the element at the front of stack
    peek() {
        return !this.isEmpty() ? this.elements.at(-1) : undefined; }

    length() {
        return this.elements.length; }
}

export default Stack;