import express from 'express';
import { getdata, getCountry, getStates, getCities } from '../controller/controller';

const router = express.Router();

router.get('/', getdata);

router.get('/countries',getCountry);

router.get('/states', getStates);

router.get('/cities', getCities)

export default router;
