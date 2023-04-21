import {Router} from 'express';
import { checkRole } from '../middlewares/checkRole';
import { addNewRoom, deleteRoomById, getAllRooms, getOneRoomById, updateRoomById } from '../controllers/roomsControllers';

const router = Router();

router.get('/', getAllRooms);
router.get('/:room_id', getOneRoomById);
router.post('/', checkRole, addNewRoom);
router.put('/:room_id', checkRole, updateRoomById);
router.delete('/:room_id', checkRole, deleteRoomById);

router.use('/resrevations', );
router.use('/pictures', );

export default router;