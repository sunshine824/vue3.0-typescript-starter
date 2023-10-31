/*
 * @Author: chenxin
 * @Date: 2023-06-06 15:00:42
 * @Description: 俄语包
 */
import { autoImportI18n } from '@/utils/util'
// 获取所有i18n文件
const I18n = autoImportI18n(require.context('@/i18n/model/', true, /\.js$/), 'ru')

export default I18n
