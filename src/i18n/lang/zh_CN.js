/*
 * @Author: chenxin
 * @Date: 2023-06-06 14:30:19
 * @Description: 简体中文包
 */
import { autoImportI18n } from '@/utils/util'
// 获取所有i18n文件
const I18n = autoImportI18n(require.context('@/i18n/model/', true, /\.js$/), 'zh')

export default I18n
