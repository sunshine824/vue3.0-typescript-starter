import vDragModal from './vDragModal'

const directives: { [key: string]: any } = {
  'drag-modal': vDragModal
}

export default {
  install(app: any) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  }
}
