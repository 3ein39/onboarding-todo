import { useI18n } from 'vue-i18n'

import dayjs from '@/plugins/dayjs.plugin.ts'

export function useLocalizedDateFormat() {
  const i18n = useI18n()

  /**
   * @param seconds The number of seconds to format.
   * @returns E.g. 1h 30m or 45s in case the seconds are less than 60.
   */
  function secondsToDuration(seconds: number): string {
    const dur = dayjs.duration(seconds, 'seconds')
    const hours = dur.hours()
    const minutes = dur.minutes()
    const secs = dur.seconds()

    if (seconds < 60) {
      return new Intl.NumberFormat(i18n.locale.value, {
        style: 'unit',
        unit: 'second',
        unitDisplay: 'long',
      }).format(secs)
    }

    const formattedHours = new Intl.NumberFormat(i18n.locale.value, {
      style: 'unit',
      unit: 'hour',
      unitDisplay: 'narrow',
    }).format(hours)

    const formattedMinutes = new Intl.NumberFormat(i18n.locale.value, {
      style: 'unit',
      unit: 'minute',
      unitDisplay: hours === 0 ? 'long' : 'narrow',
    }).format(minutes)

    if (hours === 0) {
      return formattedMinutes
    }

    if (minutes === 0) {
      return formattedHours
    }

    return `${formattedHours} ${formattedMinutes}`
  }

  /**
   * @param date The date to format.
   * @returns E.g. 2024-01-01
   */
  function toDate(date: Date): string {
    return dayjs(date)
      .locale(i18n.locale.value)
      .format('YYYY-MM-DD')
  }

  /**
   * @param date The date to format.
   * @returns E.g. 01 January 2024
   */
  function toLongDate(date: Date): string {
    return dayjs(date)
      .locale(i18n.locale.value)
      .format('D MMMM YYYY')
  }

  /**
   * @param date The date to format.
   * @returns E.g. 01/01/2024
   */
  function toNumericDate(date: Date): string {
    const formatter = new Intl.DateTimeFormat(i18n.locale.value, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    return formatter.format(date)
  }

  /**
   * @param date The date to format.
   * @returns E.g. 2 days ago or in 2 days
   */
  function fromNow(date: Date): string {
    const rtf = new Intl.RelativeTimeFormat(i18n.locale.value, {
      numeric: 'auto',
      style: 'short',
    })

    const now = new Date()
    const diffMs = date.getTime() - now.getTime()

    const units: {
      unit: Intl.RelativeTimeFormatUnit
      value: number
    }[] = [
      {
        unit: 'year',
        value: diffMs / (1000 * 60 * 60 * 24 * 365),
      },
      {
        unit: 'month',
        value: diffMs / (1000 * 60 * 60 * 24 * 30),
      },
      {
        unit: 'day',
        value: diffMs / (1000 * 60 * 60 * 24),
      },
      {
        unit: 'hour',
        value: diffMs / (1000 * 60 * 60),
      },
      {
        unit: 'minute',
        value: diffMs / (1000 * 60),
      },
      {
        unit: 'second',
        value: diffMs / 1000,
      },
    ]

    const isLessThanOneMinute = Math.abs(diffMs) < 60 * 1000

    if (isLessThanOneMinute) {
      return i18n.t('shared.time_format.now')
    }

    for (const {
      unit, value,
    } of units) {
      const rounded = Math.round(value)

      if (Math.abs(rounded) >= 1) {
        return rtf.format(rounded, unit)
      }
    }

    return rtf.format(0, 'second')
  }

  /**
   * @param date The date to format.
   * @returns E.g. 2024-01-01 10:30:00
   */
  function toDateTime(date: Date): string {
    return dayjs(date)
      .locale(i18n.locale.value)
      .format('YYYY-MM-DD HH:mm:ss')
  }

  /**
   * @param date The date to format.
   * @returns E.g. Jan 01, 2024
   */
  function toShortDate(date: Date): string {
    return dayjs(date)
      .locale(i18n.locale.value)
      .format('MMM D, YYYY')
  }

  /**
   * @param date The date to format.
   * @returns E.g. 10:30
   */
  function toTime(date: Date): string {
    return dayjs(date)
      .locale(i18n.locale.value)
      .format('HH:mm')
  }

  return {
    toDate,
    toDateTime,
    toLongDate,
    toNumericDate,
    toShortDate,
    toTime,
    fromNow,
    secondsToDuration,
  }
}
