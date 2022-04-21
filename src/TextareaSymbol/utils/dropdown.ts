class AdapterPosition {
  fixHeightGap = 5
  caret: any
  client: any
  dropdownSize: any

  constructor({
    caret,
    dropdownEle,
    scrollingEle,
    fixHeightGap = 5
  }: {
    caret: any
    dropdownEle: any
    scrollingEle: any
    fixHeightGap?: number
  }) {
    this.fixHeightGap = fixHeightGap

    this.initCaret(caret)
    this.initClient(scrollingEle)
    this.initDropdownSize(dropdownEle)
  }

  initCaret(caret: any) {
    const { top: caretTop, height: caretHeight } = caret || {}
    const { fixHeightGap } = this
    this.caret = {
      ...caret,
      top: caretTop - fixHeightGap,
      height: caretHeight + fixHeightGap + 5
    }
  }

  initClient(scrollingEle: any) {
    const { caret } = this
    const { left: toClientLeft, top: caretTop } = caret || {}

    const {
      clientWidth,
      clientHeight
      // scrollTop
    } = scrollingEle || {}

    // console.log('initClient scrollingEle', scrollingEle)
    // console.log('initClient scrollingEle scrollTop', scrollTop)
    // console.log('initClient caret caretTop', caretTop)

    // const toClientTop = caretTop - scrollTop
    const toClientTop = caretTop
    const toClientRight = clientWidth - toClientLeft
    const toClientBottom = clientHeight - toClientTop

    this.client = {
      clientWidth,
      clientHeight,
      toClientLeft,
      toClientTop,
      toClientRight,
      toClientBottom
    }
  }

  initDropdownSize(dropdownEle: any) {
    const { offsetHeight: height, offsetWidth: width } = dropdownEle
    this.dropdownSize = {
      height,
      width
    }
  }

  get isBottom() {
    const { client, caret, dropdownSize } = this
    const { toClientBottom } = client
    return toClientBottom - caret.height >= dropdownSize.height
  }
  get isRight() {
    const { client, dropdownSize } = this
    const { toClientRight } = client
    return toClientRight >= dropdownSize.width
  }
  get isTop() {
    const { dropdownSize, client } = this
    const { toClientTop } = client
    return toClientTop >= dropdownSize.height
  }

  get isLeft() {
    const { dropdownSize, client } = this
    const { toClientLeft } = client
    return toClientLeft >= dropdownSize.width
  }

  get isBottomRight() {
    return this.isBottom && this.isRight
  }
  get isTopRight() {
    return this.isTop && this.isRight
  }

  get isBottomLeft() {
    return this.isBottom && this.isLeft
  }
  get isTopLeft() {
    return this.isTop && this.isLeft
  }

  positionBottomRight() {
    const { client, caret } = this
    const { toClientTop, toClientLeft } = client

    return {
      top: toClientTop + caret.height,
      left: toClientLeft
    }
  }
  positionTopRight() {
    const { dropdownSize, client } = this
    const { toClientTop, toClientLeft } = client

    return {
      top: toClientTop - dropdownSize.height,
      left: toClientLeft
    }
  }
  positionBottomLeft() {
    const { dropdownSize, client, caret } = this
    const { toClientTop, toClientLeft } = client

    return {
      top: toClientTop + caret.height,
      left: toClientLeft - dropdownSize.width
    }
  }
  positionTopLeft() {
    const { dropdownSize, client } = this
    const { toClientTop, toClientLeft } = client

    return {
      top: toClientTop - dropdownSize.height,
      left: toClientLeft - dropdownSize.width
    }
  }
  positionOther() {
    const { dropdownSize, client } = this
    const { toClientTop, toClientLeft, toClientRight, toClientBottom, caret } =
      client

    const left =
      toClientLeft > toClientRight
        ? toClientLeft - dropdownSize.width
        : toClientLeft
    const top =
      toClientTop > toClientBottom
        ? toClientTop - dropdownSize.height
        : toClientTop + caret.height
    return {
      top,
      left
    }
  }

  get position() {
    if (this.isBottomRight) {
      return this.positionBottomRight()
    } else if (this.isTopRight) {
      return this.positionTopRight()
    } else if (this.isBottomLeft) {
      return this.positionBottomLeft()
    } else if (this.isTopLeft) {
      return this.positionTopLeft()
    } else {
      return this.positionOther()
    }
  }
}

export const getAdapterPosition = ({
  caret,
  dropdownEle,
  scrollingEle,
  fixHeightGap = 5
}: {
  caret: any
  dropdownEle: any
  scrollingEle: any
  fixHeightGap?: number
}) => {
  // console.log('getAdapterPosition caret', caret)

  const adapterPosition = new AdapterPosition({
    caret,
    dropdownEle,
    scrollingEle,
    fixHeightGap
  })

  const position = adapterPosition.position
  // console.log('getAdapterPosition adapterPosition', adapterPosition)
  // console.log('getAdapterPosition position', position)

  return position
}
