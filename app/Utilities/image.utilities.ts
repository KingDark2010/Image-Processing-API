import  sharp from 'sharp';
import * as fs from 'fs';

export const imageProcessor = async (imagePath:string, newImaagePath:string, width:string, height:string) => {
    if(!fs.existsSync(newImaagePath)) {
        await sharp(imagePath)
        .resize(parseInt(width), parseInt(height))
        .toFile(newImaagePath);
    }
};