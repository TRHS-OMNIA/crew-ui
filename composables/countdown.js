import dayjs from 'dayjs'

export default function (ts, now) {
    let target = dayjs(ts)
    let s = target.diff(dayjs(), 'second')
    if (dayjs().isBefore(target)) {
        return new Date(parseInt(s) * 1000).toISOString().substring(11, 19)
    }
    else {
        return false
    }
}