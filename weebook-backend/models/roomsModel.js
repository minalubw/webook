import { Schema, model } from 'mongoose';

const reservationSchema = new Schema({
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
    price_per_day: { type: String, required: true },
    hotel: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    pictures: [{pictureName: String}],
    reservations: [reservationSchema]
}, { timestamps: true });

roomSchema.index({ location: '2dsphere' });

export default model('User', userSchema);