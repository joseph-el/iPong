import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { promisify } from 'util';
import * as fs from 'fs';
import { extname } from 'path';
import * as https from 'https';


const writeFile = promisify(fs.writeFile);
@Injectable()
export class CloudinaryService {
  constructor() {}

  async upload(userId: string, url: string) {
    return await cloudinary.uploader.upload(url, {
      folder: 'iPong',
      overwrite: true,
      resource_type: 'image',
      unique_filename: false,
      filename_override: userId,
      use_filename: true,
    });
  }

//   async downloadImage(url: string, userId: string): Promise<Express.Multer.File> {
//     const buffer = await this.getFileBuffer(url);
//     const extension = extname(url).split('?')[0]; // Extract file extension
//     await writeFile(filePath, buffer);

//     const file: Express.Multer.File = {
//       fieldname: 'file',
//       originalname: filename,
//       encoding: '7bit',
//       mimetype: this.getMimeType(extension),
//       size: buffer.length,
//       destination: './uploads',
//       filename,
//       path: filePath,
//       buffer,
//     };

//     return file;
//   }

//   private async getFileBuffer(url: string): Promise<Buffer> {
//     return new Promise((resolve, reject) => {
//       https.get(url, (response) => {
//         const data: Uint8Array[] = [];

//         response.on('data', (chunk) => {
//           data.push(chunk);
//         });

//         response.on('end', () => {
//           const buffer = Buffer.concat(data);
//           resolve(buffer);
//         });

//         response.on('error', (error) => {
//           reject(error);
//         });
//       });
//     });
//   }

//   private getMimeType(extension: string): string {
//     switch (extension) {
//       case '.jpeg':
//       case '.jpg':
//         return 'image/jpeg';
//       case '.png':
//         return 'image/png';
//       case '.gif':
//         return 'image/gif';
//       default:
//         return 'application/octet-stream';
//     }
//   }
}
