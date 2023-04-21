import Room from '../models/roomsModel.js'

export async function getAllReservations(req, res, next){
    try {
            const { room_id } = req.params;
            const result = await Room.findOne({_id:room_id, 'reservations.user_id':req.token._id});
            res.json({success: true, data: result});
        
    } catch (error) {
        next(error);
    }
}

export async function addNewReservation(req, res, next){
    try {
          const { room_id } = req.params;
          const newreserve = req.body;
          const result = await Room.updateOne({ _id:room_id },
                         {$push:{reservations:{ ...newreserve, 'reservations.user_id':req.token._id }} });
          res.json({success: true, data: result});
    } catch (error) {
        next(error);
    }
}

export async function getOneReservationById(req, res, next){
    try {
        const { room_id, reserve_id } = req.params;
        const result = await Room.findOne({_id:room_id, '.reservations._id':reserve_id, 'reservations.user_id':req.token._id})
        res.json({success: true, data: result});
    } catch (error) {
        next(error);
    }
}

export async function updateReservationById(req, res, next){
    try {
         const {room_id, reserve_id} = req.params;
         const { name, phone, checkInDate, checkOutDate } = req.body;
         let query = {}
         if(name) 
         {
            query['reservations.$.guest.name'] = name;
         }else if(phone) 
         {
            query['reservations.$.guest.phone'] = phone;
         }else if(checkInDate) 
         {
            query['reservations.$.guest.checkInDate'] = checkInDate;
         }else if(checkOutDate) 
         {
            query['reservations.$.guest.checkOutDate'] = checkOutDate;
         }
         const result = await Room.updateOne({_id:room_id, 'reservations._id':reserve_id, 'reservations.user_id':req.token._id}, 
                        {$set: query});
         res.json({success: true, data: result});
    } catch (error) {
        next(error);
    }
}

export async function deleteReservationById(req, res, next){
    try {
        const {room_id, reserve_id} = req.params;
        const result = await Room.updateOne({_id:room_id}, 
                       {$pull: {reservations:{_id: reserve_id}}});
        res.json({success: true, data: result});                
    } catch (error) {
        next(error);
    }
}