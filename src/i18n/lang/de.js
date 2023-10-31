/*
 * @Author: chenxin
 * @Date: 2023-06-06 14:32:16
 * @Description: 德语包
 */
import { autoImportI18n } from '@/utils/util'
// 获取所有i18n文件
const I18n = autoImportI18n(require.context('@/i18n/model/', true, /\.js$/), 'de')

export default I18n
