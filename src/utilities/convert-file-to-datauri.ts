import multer from 'multer';
// import DataURI from 'datauri';
const Datauri = require('datauri');
import { File } from '../interfaces/file.interface';
// const storage = multer.memoryStorage();
// const multerUploads = multer({ storage }).single('image');
const dUri = new Datauri();
/**
 * @description This function converts the buffer to data url
 * @returns {String} The data url from the string buffer
 * @param file
 */
const dataUri = (file: File)  => dUri.format(file.originalname, file.buffer);
// export { multerUploads, dataUri };
export { dataUri };
