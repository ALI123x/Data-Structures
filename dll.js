/**
 *
 * Doubly LinkedList By: ALI ALGHAREEB
 *
 **/

// ---------------------------

// Class For Create Single Node Inside DLL
class Node {
  constructor(val = 'New Node') {
    this.val = val
    this.next = this.prev = null
  }
}

// ---------------------------

class DLL {
  constructor() {
    this.head = this.tail = null
    this.length = 0
  }

  // --------------- Methods ---------------
  addHead(val = 'New Head') {
    const newHead = new Node(val)

    if (!this.head) {
      this.tail = this.head = newHead

      this.length++
      return newHead
    }

    this.head.prev = newHead
    newHead.next = this.head
    this.head = newHead

    this.length++
    return newHead
  }

  // ---------------------------

  addTail(val = 'New Tail') {
    const newTail = new Node(val)

    if (!this.head) {
      this.head = this.tail = newTail

      this.length++
      return newTail
    }

    this.tail.next = newTail
    newTail.prev = this.tail
    this.tail = newTail

    this.length++
    return newTail
  }

  // ---------------------------

  // 400 === 'Invalid Index Number!'
  // 404 === 'Not Found'
  findByIndex(index = 0) {
    if (index < 0 || index > this.length - 1) return 400
    if (index == 0) return this.head
    if (index == this.length - 1) return this.tail

    let current
    const len = this.length

    // O(n/2) Search Time
    if (index <= len / 2) {
      current = this.head.next
      for (let i = 1; i <= len / 2; i++) {
        if (i == index) {
          return current
        }
        current = current.next
      }
    } else {
      current = this.tail.prev
      for (let i = len - 2; i > len / 2; i--) {
        if (i == index) {
          return current
        }
        current = current.prev
      }
    }
    return 404
  }

  // ---------------------------

  // 400 === 'Invalid Index Number!'
  addByIndex(val = 'new Value', index = 0) {
    if (index < 0 || index > this.length) return 400
    if (index == 0) return this.addHead(val)
    if (index == this.length) return this.addTail(val)

    const newNode = new Node(val)
    let nodeToMove = this.findByIndex(index)
    let prevNode = nodeToMove.prev

    prevNode.next = newNode
    newNode.prev = prevNode
    newNode.next = nodeToMove
    nodeToMove.prev = newNode

    this.length++
    return newNode
  }

  // ---------------------------

  findByValue(value = null) {
    if (this.length == 0) return 'List Is Empty'

    let current = this.head
    const len = this.length

    for (let i = 0; i < len; i++) {
      if (current && current.val == value) {
        current.index = i
        return current
      }
      current = current.next
    }
    return 'Value Not Found!'
  }

  // ---------------------------

  removeHead() {
    if (!this.head) return 'List Is Empty!'

    let removedHead = this.head
    this.head = this.head.next
    this.head.prev = null

    this.length--
    return removedHead
  }

  // ---------------------------

  removeTail() {
    if (!this.head) return 'List Is Empty!'

    let removedTail = this.tail
    this.tail = this.tail.prev
    this.tail.next = null

    this.length--
    return removedTail
  }

  // ---------------------------

  removeByIndex(index = 0) {
    if (index == 0) return this.removeHead()
    if (index == this.length - 1) return this.removeTail()

    let nodeToRemove = this.findByIndex(index)
    if (nodeToRemove == 400) return 'Invalid Index Number'

    let prevNode = nodeToRemove.prev,
      nextNode = nodeToRemove.next

    prevNode.next = nextNode
    nextNode.prev = prevNode

    this.length--
    return nodeToRemove
  }

  // ---------------------------

  getAllNodes() {
    let current = this.head,
      i = 0
    const arr = []
    while (current) {
      current.index = i
      arr.push({ value: current.val, index: current.index })
      current = current.next
      i++
    }
    return arr
  }
}

// -----------------------------

const dll = new DLL()

dll.addHead('head1')
dll.addHead('head2')
dll.addHead('head3')

dll.addTail('tail1')
dll.addTail('tail2')

dll.addByIndex('XXX', 3)

console.log(dll.getAllNodes())

// console.log(dll.findByIndex(3))
// console.log(dll.findByValue('XXX'))
// console.log(dll.removeHead())
// console.log(dll.removeTail())

// console.log(dll)
