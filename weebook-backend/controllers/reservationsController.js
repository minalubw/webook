import Room from '../models/roomsModel.js';

export async function getAllReservations(req, res, next) {
    try {
        const { room_id } = req.params;
        const result = await Room.findOne({ _id: room_id, 'reservations.user_id': req.token._id });
        res.json({ success: true, data: result });

    } catch (error) {
        next(error);
    }
}

export async function getAllReservationsForAUser(req, res, next){
    console.log('we are here');
    try {
        const result = await Room.aggregate([
            {$match: {"reservations.user_id": req.token._id}},
            {$unwind: "$reservations"},
            {$match: {"reservations.user_id": req.token._id}},
            {$group: {_id: null, reservations: {$push: "$reservations"}}},
            {$project: {_id: 0, reservations: 1}}
        ]);
        res.json({success: true, data: result});
    } catch (error) {
        next(error);
    }
}

export async function addNewReservation(req, res, next) {
    try {
        const { room_id } = req.params;
        const newreserve = req.body;
        console.log(newreserve);
        const result = await Room.updateOne( { _id: room_id },
            [{ $set: { available: "no" }},
             {$lookup: {from: "rooms",
                        localField: "_id",
                        foreignField: "_id",
                        as: "room"
                    }},
            { $addFields: {room: { $arrayElemAt: ["$room", 0] }}},
            {$push: {"room.reservations": {...newreserve, user_id: req.token._id,
                        user_name: req.token.name, user_email: req.token.email,
                        room_type: "$room.type",
                        hotel_name: "$room.hotel_name"}}}]);
        res.json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}

export async function getOneReservationById(req, res, next) {
    try {
        const { room_id, reserve_id } = req.params;
        const result = await Room.findOne({ _id: room_id, 'reservations._id': reserve_id, 'reservations.user_id': req.token._id }, {'reservations.$':1})
        res.json({ success: true, data: result.reservations[0]});
    } catch (error) {
        next(error);
    }
}

export async function updateReservationById(req, res, next) {
    try {
        const { room_id, reserve_id } = req.params;
        const { name, phone, checkInDate, checkOutDate } = req.body;
        let query = {}
        if (name) {
            query['reservations.$.guest.name'] = name;
        } else if (phone) {
            query['reservations.$.guest.phone'] = phone;
        } else if (checkInDate) {
            query['reservations.$.checkInDate'] = checkInDate;
        } else if (checkOutDate) {
            query['reservations.$.checkOutDate'] = checkOutDate;
        }else{
            return next(new Error("Input not valid"));
        }
        const result = await Room.updateOne({ _id: room_id, 'reservations._id': reserve_id, 'reservations.user_id': req.token._id },
            { $set:  query });
        res.json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}

export async function deleteReservationById(req, res, next) {
    try {
        const { room_id, reserve_id } = req.params;
        const result = await Room.updateOne({ _id: room_id, 'reservations.user_id': req.token._id},
            { $pull: { reservations: {_id:  reserve_id.trim()}}});
        res.json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}

async function updateAvailableRooms() {
    try {
      let rooms = await Room.find({});
      for (let room of rooms) {
        let reservations = room.reservations;
        const now = new Date();
        for (let reservation of reservations) {
          if (reservation.checkOutDate <= now) {
            room.available = "yes";
          }
        }
        await room.save();
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  setInterval(updateAvailableRooms, 24 * 60 * 60 * 1000);