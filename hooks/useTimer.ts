import { useState, useEffect } from 'react'

export const useTimer = () => {
    const [time, setTime] = useState(1)

    useEffect(() => {
        const intervals = setInterval(() => {
            setTime((prevCount) => (prevCount === 59 ? 0 : prevCount + 1));
        }, 1000)

        return (() => {
            clearInterval(intervals)
        })
    }, [])

    return time

}
