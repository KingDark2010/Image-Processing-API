import Express from 'express';
import { ImageController } from '../Controllers/image.controller';
export const router = Express.Router();

//make get router on / that have query of file, width, height
router.get('/', ImageController);

