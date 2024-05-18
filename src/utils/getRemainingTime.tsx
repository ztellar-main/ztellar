import dayjs from "dayjs";


export const getRemainingTime = (timeStamps:any) => {
    const timeStampDayjs = dayjs(timeStamps)
    const nowDayJs:any = Date.now();

    return{
        seconds: getRemainingSeconds(nowDayJs,timeStampDayjs),
        minutes: getRemainingMins(nowDayJs,timeStampDayjs),
        hours: getRemainingHours(nowDayJs,timeStampDayjs),
        days: getRemainingDays(nowDayJs,timeStampDayjs)
    }
    }

    const getRemainingSeconds = (nowDayjs:Date,timeStampDayjs:any) => {
        const seconds = timeStampDayjs.diff(nowDayjs, 'seconds') % 60

        const numToStringLength = Number(seconds.toString().length);

        if(numToStringLength === 1){
          return `0${seconds}`
        }
        return seconds
        
    }
    const getRemainingMins = (nowDayjs:any,timeStampDayjs:any) => {
        const minutes = timeStampDayjs.diff(nowDayjs, 'minutes') % 60
        return minutes;
    }
    const getRemainingHours = (nowDayjs:any,timeStampDayjs:any) => {
        const hours = timeStampDayjs.diff(nowDayjs, 'hours') % 24
        return hours;
    }
    const getRemainingDays = (nowDayjs:any,timeStampDayjs:any) => {
        const days = timeStampDayjs.diff(nowDayjs, 'days')
        return days;
    }