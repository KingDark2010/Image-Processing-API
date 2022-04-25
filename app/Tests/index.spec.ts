import supertest from "supertest";
import { app } from "../main";
const request = supertest(app);
import { validateFile, validateQuery } from "../Controllers/image.controller";
import { QueryParams } from "../Models/request.model";

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