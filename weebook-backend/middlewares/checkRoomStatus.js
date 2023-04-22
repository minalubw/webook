import Room from '../models/roomsModel.js'

export async function checkRoomStatus(req, res, next) {
    const { room_id } = req.params;
    let room = await Room.findOne({ _id: room_id });
    if (room.available === 'no') {
        next(new Error("Room already booked for this period!"));
    }
    else {
        next();
    }
}
