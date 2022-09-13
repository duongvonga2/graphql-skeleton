import express from "express";
import dotenv from 'dotenv';
dotenv.config();

import { postgresDb } from "./commons/databases";
import { router } from "./modules/router";
import { ErrorCatcherMiddleware, loggerMiddleware, graphqlMiddleware } from "./commons/middlewares";


export const app = express();
postgresDb.sync().then((result) => {
    console.log('sync postgres success');
}).catch(error => {
    console.error('sync postgres failed', error);
})
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use('/api', loggerMiddleware, router);
app.use('/graphql',loggerMiddleware, graphqlMiddleware);
app.use(ErrorCatcherMiddleware);
const port = process.env.PORT || 4000;
export const server = app.listen(port, ()=> {
    console.log('application start at port', port);
});