import * as fs from 'fs';

export const validateFile = (filePath: string):boolean => {
    if(!fs.existsSync(filePath)) {
        return false;
    }
    return true;
};
