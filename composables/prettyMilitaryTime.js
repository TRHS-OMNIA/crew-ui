import dayjs from 'dayjs'

export default function (ts) {
    let d = new Date(ts)
    let day = dayjs(d)
    return day.format('HH:mm')
}