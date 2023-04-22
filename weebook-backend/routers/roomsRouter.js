import {Router} from 'express';
import { checkRole } from '../middlewares/checkRole.js';
import { addNewRoom, deleteRoomById, getAllRooms, getOneRoomById, updateRoomById } from '../controllers/roomsController.js';
import reservationRouter from './reservationsRouter.js';

const router = Router();

router.get('/', getAllRooms);
router.get('/:room_id', getOneRoomById);
router.post('/', checkRole, addNewRoom);
router.patch('/:room_id', checkRole, updateRoomById);
router.delete('/:room_id', checkRole, deleteRoomById);

router.use('/:room_id/reservations', reservationRouter);
// router.use('/:room_id/pictures', );

export default router;