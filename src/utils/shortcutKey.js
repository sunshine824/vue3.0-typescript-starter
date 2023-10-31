import hotkeys from 'hotkeys-js'

// CAT快捷键映射关系表
export const ShortcutKey = {
  submitLock: ['Ctrl+Enter'], // 保存提交并跳到下一句未锁定句段
  copySource: ['Ctrl+Insert', 'Ctrl+Shift+V'], // 复制原文
  clearTarget: ['Ctrl+Delete', 'Control+D'], // 清除译文
  addTerm: ['Ctrl+S'], // 添加术语
  capsLock: ['Ctrl+P'], // 大小写切换
  addRemark: ['Ctrl+M'], // 添加备注
  jumpDown: ['Ctrl+Down', 'Command+Down'], // 跳到下一句
  jumpUp: ['Ctrl+Up', 'Command+Up'], // 跳到上一句
  jumpTo: ['Ctrl+G'], //跳到指定编号的句段
  bold: ['Ctrl+B'], //将选中的文本加粗
  italic: ['Ctrl+I'], //将选中的文本变成斜体
  underline: ['Ctrl+U'], //给选中的文本添加下划线
  suffix: ['Ctrl+='], //将选中的文本设置为下标
  subscript: ['Ctrl+Shift+='], //将选中的文本设置为上标
  applyCorpus: ['Ctrl+1', 'Ctrl+2', 'Ctrl+3', 'Ctrl+4', 'Ctrl+5', 'Ctrl+6', 'Ctrl+7', 'Ctrl+8', 'Ctrl+9'], //获取语料
  editSource: ['F2', 'Control+E'], //修改句段原文
  search: ['F3', 'Command+S'] //在记忆库或术语库中搜索语句片段（词或词组）
}

export const shortcutKey = {
  // 绑定快捷键
  bind: (func) => {
    hotkeys.unbind()
    const values = Object.values(ShortcutKey).flat().join(',')
    hotkeys.filter = function () {
      return true
    }
    //How to add the filter to edit labels. <div contentEditable="true"></div>
    //"contentEditable" Older browsers that do not support drops
    hotkeys.filter = function (event) {
      var tagName = (event.target || event.srcElement).tagName
      return !(tagName.isContentEditable || tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA')
    }

    hotkeys.filter = function (event) {
      var tagName = (event.target || event.srcElement).tagName
      hotkeys.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other')
      return true
    }

    hotkeys(values, (e, handler) => {
      e.preventDefault()
      Object.keys(ShortcutKey).some((key) => {
        if (ShortcutKey[key].includes(handler.key)) {
          func(key, handler.key)
          return true
        }
      })
      return false
    })
  },
  // 解除绑定的快捷键
  unbind: () => {
    hotkeys.unbind()
  }
}
