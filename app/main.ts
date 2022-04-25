import Express, { Application } from 'express';
import Morgan from 'morgan';
import * as dotenv from 'dotenv';
import { router } from './Routes/image.routes';
//initialize dotenv
dotenv.config();

//initialize express
export const app: Application = Express();
//initialize morgan
app.use(Morgan('dev'));
app.use(Express.static('public'));
//use the routes from the routes folder
app.use('/', router);

export const port: number = parseInt(process.env.PORT || '3000');
