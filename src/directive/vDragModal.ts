export default {
  mounted(el: any) {
    const dragBox = el // 获取当前元素
    const title = el.querySelector('.drag-head')
    title.onmousedown = (e: any) => {
      // 算出鼠标相对元素的位置
      const disX = e.clientX - dragBox.offsetLeft
      const disY = e.clientY - dragBox.offsetTop
      document.onmousemove = (e) => {
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        const left = e.clientX - disX
        const top = e.clientY - disY
        // 移动当前元素
        dragBox.style.left = left + 'px'
        dragBox.style.top = top + 'px'
      }
      document.onmouseup = () => {
        // 鼠标弹起来的时候不再移动
        document.onmousemove = null
        // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
        document.onmouseup = null
      }
    }
  }
}
