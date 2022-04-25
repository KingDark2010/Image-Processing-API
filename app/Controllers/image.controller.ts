import Express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import  sharp from 'sharp';
import { QueryParams } from '../Models/request.model';

export const ImageController = async (req: Express.Request, res: Express.Response) => {
    try{
        const queryObject: QueryParams = {
            file: req.query.file ?String(req.query.file) : '',
            width: req.query.width ?String(req.query.width) : '',
            height: req.query.height ?String(req.query.height) : ''
        };
        if(!validateQuery(queryObject)) {
            res.status(400).send('Invalid query, please make sure to follow the format: ?file=file-name&width=file-width&height=file-height');
            return;
        }
        const filePath: string = path.resolve(__dirname, '../../../public/', queryObject.file);
        if(!validateFile(filePath)) {
            res.status(404).send('file not found, make sure image exists in public folder');
        }else {
            const thumbsPath: string = filePath.replace('public', 'public/thumbs');
            if(!fs.existsSync(thumbsPath)) {
                fs.mkdirSync(thumbsPath);
            }
            //create thumb file name
            const thumbFileName: string = `thumb-${queryObject.width}-${queryObject.height}-${queryObject.file}`;
            //create thumb file path
            const thumbFilePath: string = path.resolve(__dirname, '../../../public/thumbs/', thumbFileName);
            //check if thumb file exist
            if(!fs.existsSync(thumbFilePath)) {
                //create thumb file
                await sharp(filePath)
                .resize(parseInt(queryObject.width), parseInt(queryObject.height))
                .toFile(thumbFilePath);
            }
            //send thumb file
            res.sendFile(thumbFilePath);
        }
    }catch(err) {
        res.status(500).json(err);
    }
};


export const validateQuery = (query: QueryParams):boolean => {
    if(query.file === undefined || query.file === null || query.file === '') {
        return false;
    }
    if(query.width === undefined || query.width === null || query.width === '') {
        return false;
    }
    if(query.height === undefined || query.height === null || query.height === '') {
        return false;
    }
    return true;
};

export const validateFile = (filePath: string):boolean => {
    if(!fs.existsSync(filePath)) {
        return false;
    }
    return true;
};

