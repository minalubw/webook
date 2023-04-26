export async function checkDate(req, res, next){
    const { checkInDate, checkOutDate } = req.body;
    if(checkInDate >= checkOutDate){
        return next(new Error('Check-out date should be later than Check-in date'));
    }
    else return next();
}