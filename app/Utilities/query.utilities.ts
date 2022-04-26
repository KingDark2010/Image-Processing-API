import { QueryParams } from '../Models/request.model';

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