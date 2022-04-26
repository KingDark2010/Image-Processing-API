import Express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { QueryParams } from '../Models/request.model';
import { validateFile } from '../Utilities/file.utilities';
import { imageProcessor } from '../Utilities/image.utilities';
import { validateQuery } from '../Utilities/query.utilities';

export const ImageController = async (req: Express.Request, res: Express.Response) => {
    try{
        const queryObject: QueryParams = {
            file: req.query.file ?String(req.query.file) : '',
            width: req.query.width ?String(req.query.width) : '',
            height: req.query.height ?String(req.query.height) : ''
        };
        if(!validateQuery(queryObject)) {
            res.status(400).send('Invalid filename/height/width parameters, please make sure to follow the format: ?file=file-name&width=file-width&height=file-height');
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
            const thumbFilePath: string = path.resolve(thumbsPath, thumbFileName);

            await imageProcessor(filePath, thumbFilePath, queryObject.width, queryObject.height);
            //send thumb file
            res.sendFile(thumbFilePath);
        }
    }catch(err) {
        res.status(500).json(err);
    }
};