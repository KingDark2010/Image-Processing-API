import path from "path";
import supertest from "supertest";
import { app } from "../main";
import * as fs from 'fs';
const request = supertest(app);

import { QueryParams } from "../Models/request.model";
import { validateFile } from "../Utilities/file.utilities";
import { imageProcessor } from "../Utilities/image.utilities";
import { validateQuery } from "../Utilities/query.utilities";

it('should return 200', async () => {
    const response = await request.get('/?file=test.PNG&width=200&height=213');
    expect(response.status).toBe(200);
});

it('should return 400', async () => {
    const response = await request.get('/?file=nonexsitting.PNG&width=200');
    expect(response.status).toBe(400);
});

it('should return true', async () => {
    const mockData: QueryParams = {
        file: 'test.PNG',
        width: '200',
        height: '213'
    };
    const response = validateQuery(mockData);
    expect(response).toBe(true);
});

it('should return false', async () => {
    const response = validateFile('nonexsitting.PNG');
    expect(response).toBe(false);
});

//test this function in image.utilities.ts
it('should return true', async () => {
    const { imagePath, newImagePath, width, height } = {
        imagePath: path.resolve(__dirname, '../../../public/', 'test.PNG'),
        newImagePath: path.resolve(__dirname, '../../../public/thumbs/', 'thumb-200-213-test.PNG'),
        width: '200',
        height: '213'
    };
    await imageProcessor(imagePath, newImagePath, width, height);
    expect(fs.existsSync(newImagePath)).toBe(true);
});


afterAll(() => {
    fs.unlinkSync(path.resolve(__dirname, '../../../public/thumbs/', 'thumb-200-213-test.PNG'));
});