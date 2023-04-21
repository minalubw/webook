import Room from '../models/roomsModel.js';

export async function addNewRoom(req, res, next){
    const new_room = req.body;
    try {
        const room = await Room.create(new_room);
        res.json({success: true, data: room});
    } catch (error) {
        next(error);
    }
}

export async function getAllRooms(req, res, next){
    try {
        const result = await Room.find({});
        res.json({result});
    } catch (error) {
        next(error);
    }
}

export async function getOneRoomById(req, res, next){
    const { room_id } = req.params;
    try {
        const room = await Room.findOne({room_id});
        if(!room){
            return res.status(process.env.NOT_FOUND).json({ error: 'Room not found' });
        }
        res.json({room});
    } catch (error) {
        next(error);
    }
}

export async function updateRoomById(req, res, next){
    const { room_id } = req.params;
    const updated = req.body;
    try {
        const room = await Room.updateOne({room_id}, updated);
        if(!room){
            return res.status(process.env.NOT_FOUND).json({ error: 'Room not found' });
        }
        res.json({success: true, data: room});
    } catch (error) {
        
    }
}

export async function deleteRoomById(req, res, next){
    const { room_id } = req.params;
    try {
        const result = await Room.deleteOne({room_id});
        if(!result){
            return res.status(process.env.NOT_FOUND).json({ error: 'Room not found' });
        }
        res.json({success: true, data: result});
    } catch (error) {
        
    } 
}