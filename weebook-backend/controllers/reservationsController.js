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

export async function updateReservationForUser(req, res, next){
    const {reserve_id} = req.params;
    const updatedReservation = req.body;
    console.log(updatedReservation);
    try {
        const result = await Room.updateOne({'reservations._id': reserve_id},
          {$set: {'reservations.$.guest.name': updatedReservation.guest.name,
                  'reservations.$.guest.phone': updatedReservation.guest.phone,
                  'reservations.$.checkInDate': updatedReservation.checkInDate,
                  'reservations.$.checkOutDate': updatedReservation.checkOutDate
                }});
        console.log(result);
        return res.json({success: true, data: result});
    } catch (error) {
        next(error);
    }
}

export async function getOneReservationForUser(req, res, next){
    const { reserve_id } = req.params;
    try {
        const result = await Room.findOne({'reservations._id': reserve_id, 'reservations.user_id': req.token._id }, {'reservations.$': 1});
        res.json({success: true, data: result.reservations[0]});
    } catch (error) {
        next(error);

    }
}

export async function getAllReservationsForAUser(req, res, next) {

    try {
        const result = await Room.aggregate([
            { $match: { "reservations.user_id": req.token._id } },
            { $unwind: "$reservations" },
            { $match: { "reservations.user_id": req.token._id } },
            { $group: { _id: null, reservations: { $push: "$reservations" } } },
            { $project: { _id: 0, reservations: 1 } }
        ]);
        res.json({ success: true, data: result[0].reservations});
    } catch (error) {
        next(error);
    }
}

export async function addNewReservation(req, res, next) {
   
    const { room_id } = req.params;
    const newreserve = req.body;
    const {checkInDate, checkOutDate} = req.body;
    try {
        const room = await Room.findById(room_id);
        if (!room) {
            return next(new Error('Room not found'));
        }

        const conflictingReservations = room.reservations.filter(reservation => {
            const existingCheckInDate = new Date(reservation.checkInDate);
            const existingCheckOutDate = new Date(reservation.checkOutDate);
            const requestedCheckInDate = new Date(checkInDate);
            const requestedCheckOutDate = new Date(checkOutDate);

            return (
                (requestedCheckInDate >= existingCheckInDate && requestedCheckInDate < existingCheckOutDate) ||
                (requestedCheckOutDate > existingCheckInDate && requestedCheckOutDate <= existingCheckOutDate) ||
                (requestedCheckInDate <= existingCheckInDate && requestedCheckOutDate >= existingCheckOutDate)
            );
        });

        if (conflictingReservations.length > 0) {
            return res.status(400).json({ error: 'The room is not available for the requested dates' });
        }
        room.reservations.push({
            ...newreserve, hotel_name: room.hotel_name, room_type: room.type,
            user_id: req.token._id, user_name: req.token.name, user_email: req.token.email,
        });

        room.available = 'no';
        await room.save();
        return res.json({ success: true, data: room.reservations[room.reservations.length - 1] });
    } catch (error) {
        next(error);
    }
}

export async function getOneReservationById(req, res, next) {
    try {
        const { room_id, reserve_id } = req.params;
        const result = await Room.findOne({ _id: room_id, 'reservations._id': reserve_id, 'reservations.user_id': req.token._id }, { 'reservations.$': 1 })
        res.json({ success: true, data: result.reservations[0] });
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
        } else {
            return next(new Error("Input not valid"));
        }
        const result = await Room.updateOne({ _id: room_id, 'reservations._id': reserve_id, 'reservations.user_id': req.token._id },
            { $set: query });
        res.json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}

export async function deleteReservationById(req, res, next) {
    try {
        const { room_id, reserve_id } = req.params;
        const result = await Room.updateOne({ _id: room_id, 'reservations.user_id': req.token._id },
            { $pull: { reservations: { _id: reserve_id.trim() } } });
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

setInterval(updateAvailableRooms, 5000);