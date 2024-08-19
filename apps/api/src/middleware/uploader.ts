import multer from 'multer';
import path, { dirname } from 'path';
import { Request, Response } from 'express';

export const uploader = (dirName?: string | null, prefixname?: string) => {
  const mainDir = path.join(__dirname, '../../public');
  console.log('LOG FROM FILE UPLOADER.TS FILE');

  const configFileStore = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void,
    ) => {
      console.log('destination file:', mainDir);
      const fileDestination = dirName ? mainDir + dirName : mainDir;
      callback(null, fileDestination);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void,
    ) => {
      console.log('file info', file);
      const existName = file.originalname.split('.');
      console.log(existName);

      const extention = existName[existName.length - 1];
      console.log(extention);
      callback(null, `IMG${prefixname || 'MEDIA'}${Date.now()}.${extention}`);
    },
  });
  return multer({ storage: configFileStore });
};
