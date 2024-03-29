import { definePlugin, promisify } from '../../utils'

function hideLoading(options?: Parameters<typeof wx.hideLoading>[0]) {
  options = Object.assign({ noConflict: true }, options)
  return promisify(wx.hideLoading)(options)
}

export const hideLoadingPlugin = definePlugin((col) => {
  ;(col as any)['hideLoading'] = hideLoading
})
