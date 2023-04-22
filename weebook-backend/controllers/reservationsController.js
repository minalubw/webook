import mongoose from 'mongoose';
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

export async function addNewReservation(req, res, next) {
    try {
        const { room_id } = req.params;
        const newreserve = req.body;
        console.log(newreserve);
        const result = await Room.updateOne({ _id: room_id },
            { $push: { reservations: { ...newreserve, user_id: req.token._id, user_name: req.token.name, user_email: req.token.email, } } });
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