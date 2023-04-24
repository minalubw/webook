import { Router } from "express";
import multer from "multer";
import { addNewPicture, getPictureByName } from "../controllers/picturesController.js";


const upload = multer({ dest: 'uploads/' })
const router = Router({ mergeParams: true })

router.post('/', upload.single('pictureName'), addNewPicture);
router.get('/:pictureName', getPictureByName);

export default router;