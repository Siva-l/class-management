import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  constructor(private configService: ConfigService) {}

  async uploadProfileImage(file: Express.Multer.File) {
    const uploadPath = this.configService.get<string>('UPLOAD_PATH', 'uploads');
    const profileFolder = this.configService.get<string>(
      'PROFILE_FOLDER',
      'profile',
    );

    const folderPath = path.join(process.cwd(), uploadPath, profileFolder);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname}`;

    const filePath = path.join(folderPath, fileName);

    fs.writeFileSync(filePath, file.buffer);

    return {
      message: 'File uploaded successfully',
      fileName,
      devicePath: filePath,
    };
  }
}
