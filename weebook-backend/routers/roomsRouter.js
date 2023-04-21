import { Router } from 'express';
import reservationsRouter from './reservationsRouter.js';
import { getAllRooms, addNewRoom, getOneRoomById, updateRoomById, deleteRoomById} from '../controllers/roomsController.js'


const router = Router();

router.get('', getAllRooms);
router.post('',addNewRoom);
router.get('/:room_id',getOneRoomById);
router.patch('/:room_id',updateRoomById);
router.delete('/:room_id',deleteRoomById);

router.use('/:room_id/reservations',reservationsRouter);

export default router;