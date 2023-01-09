import dayjs from 'dayjs'

export default function (now) {
    return dayjs(now).format('h:mm:ss')

}