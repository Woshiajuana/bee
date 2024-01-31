import { defineOptions } from './defineOptions'

const AaMixin = defineOptions({
  data: {
    aa: 'aa',
  },
  methods: {
    aaFn() {
      console.log('aa')
    },
  },
})

const BbMixin = defineOptions({
  mixins: [AaMixin],
  data: {
    bb: 'bb',
  },
  methods: {
    bbFn() {
      console.log('bb')
    },
  },
})

const DataMixin = defineOptions({
  mixins: [BbMixin],
  data: {
    xx: 1,
  },
  onLoad() {},
  methods: {
    hello() {
      // this.data.xx
      // this.data.aa
      const aa = this.aa
      const bb = this.bb
      const xx = this.xx
      const cc = this.cc
      this.aaFn()
      this.bbFn()
      this.hello()
      return 'hello world'
    },
  },
})
