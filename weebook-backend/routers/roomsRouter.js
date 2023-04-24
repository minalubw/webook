import {Router} from 'express';
import { checkRole } from '../middlewares/checkRole.js';
import { addNewRoom, deleteRoomById, getAllRooms, getNearByRooms, getOneRoomById, updateRoomById } from '../controllers/roomsController.js';
import reservationRouter from './reservationsRouter.js';
import pictureRouter from './picturesRouter.js';
import { getAllReservationsForAUser } from '../controllers/reservationsController.js';


const router = Router();
router.get('/reservations', getAllReservationsForAUser);
router.get('/', getAllRooms);
router.get('/:room_id', getOneRoomById);
router.post('/nearby', getNearByRooms);
router.post('/', checkRole, addNewRoom);
router.patch('/:room_id', checkRole, updateRoomById);
router.delete('/:room_id', checkRole, deleteRoomById);


router.use('/:room_id/reservations', reservationRouter);
router.use('/:room_id/pictures', pictureRouter);

export default router;