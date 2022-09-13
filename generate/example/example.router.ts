`import {Router} from 'express';
import { {{moduleName}}Controller } from './{{moduleName}}.controller';

const router = Router();
const {{moduleName}}Router = Router();

router.use('/{{moduleName}}', {{moduleName}}Router);

export {router as {{moduleName}}Router}`