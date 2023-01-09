import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar'

export default function (ts) {
    dayjs.extend(calendar)

    return dayjs(dayjs(new Date(ts))).calendar(dayjs(), {
        sameDay: '[today at] h:mm A',
        nextDay: '[tomorrow at] h:mm A',
        nextWeek: 'dddd [at] h:mm A',
        sameElse: '[on] M/DD'
    })
}