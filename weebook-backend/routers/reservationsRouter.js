import { Router } from 'express';
import { getAllReservations, addNewReservation, getOneReservationById, updateReservationById, deleteReservationById} from '../controllers/reservationsController.js';
import { checkRoomStatus } from '../middlewares/checkRoomStatus.js';

const router = Router({mergeParams:true});

router.get('/', getAllReservations);
router.post('/', checkRoomStatus, addNewReservation);
router.get('/:reserve_id', getOneReservationById);
router.patch('/:reserve_id', updateReservationById);
router.delete('/:reserve_id', deleteReservationById);

export default router;