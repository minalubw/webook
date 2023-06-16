export async function checkDate(req, res, next){
    const { checkInDate, checkOutDate } = req.body;
    if(checkInDate >= checkOutDate){
        return next(new Error('Check-out date should be later than Check-in date'));
    }
    const now = new Date().toISOString().slice(0, 10);
    if(checkInDate < now ){
        return next(new Error('Check-in date cannot before today'));
    }
    if(checkOutDate <= now){
        return next(new Error('Check-out date cannot today or before today'));
    }
    else return next();
}