import mongoose, { Mongoose, Schema, model } from 'mongoose';

const reservationSchema = new Schema({
    user_id: String,
    user_name: String,
    user_email: String,
    guest: { 
        name: { type: String, required: true }, 
        phone: { type: String, required: true },
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    }
});

const roomSchema = new Schema({
    type: { type: String, required: true },
    price_per_day: { type: Number, required: true },
    available: { type: String, enum: ['yes', 'no'], default: 'yes'},
    hotel_name: { type: String, required: true },
    location: [Number],
    pictures: [{pictureName: String}],
    reservations: [{type: reservationSchema}]
}, { timestamps: true });

roomSchema.index({ location: '2d' });

export default model('Room', roomSchema);