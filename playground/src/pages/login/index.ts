import './index.json'
import './index.wxml'
import './index.scss'
import { createPage, createBehavior } from '@bee/core'

const a = createBehavior({
  data: {
    a: 'a',
  },
  methods: {
    aFn() {
      console.log(this.data.a)
      console.log(this.data.xx)
    },
  },
})

const b = createBehavior({
  data: {
    b: 'b',
  },
  methods: {
    bFn() {
      console.log(this.data.b)
    },
  },
})

const c = createBehavior({
  behaviors: [a],
  data: {
    c: 'c',
  },
  methods: {
    cFn() {
      console.log(this.data.a)
      console.log(this.data.c)
      this.aFn()
      this.cFn()
    },
  },
})

createPage({
  behaviors: [b, c],
  onLoad() {
    const a = this.data.a
    const b = this.data.b
    const c = this.data.c
    console.log(a, b, c)
    this.aFn()
    this.bFn()
    this.cFn()
    this.test()
  },
  test() {},
})
