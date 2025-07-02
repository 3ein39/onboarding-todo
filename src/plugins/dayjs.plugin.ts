import dayjs from 'dayjs'
import nl from 'dayjs/locale/nl.js'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import duration from 'dayjs/plugin/duration.js'
import isBetween from 'dayjs/plugin/isBetween.js'
import isoWeek from 'dayjs/plugin/isoWeek'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'
import isToday from 'dayjs/plugin/isToday.js'
import localeData from 'dayjs/plugin/localeData.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import updateLocale from 'dayjs/plugin/updateLocale.js'
import utc from 'dayjs/plugin/utc.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'

import { LocaleUtil } from '@/utils/locale.util.ts'

dayjs.extend(updateLocale)
dayjs.updateLocale(LocaleUtil.getLocale(), {
  weekStart: 1,
})

dayjs.extend(weekOfYear)
dayjs.extend(localeData)
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(isBetween)
dayjs.extend(duration)
dayjs.extend(isToday)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(utc)
dayjs.locale(nl)
dayjs.extend(isoWeek)

export default dayjs
