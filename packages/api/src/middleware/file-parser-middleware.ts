import { Logger, PayloadTooLargeException } from '@nestjs/common'

export const fileParserMiddleware = (req, res, next) => {
  const logger = new Logger('FileParser');
  const contentLength = req.headers['content-length'];
  const maxFileSizeMB = process.env.STORAGE_MAX_FILE_SIZE_MB
    ? parseInt(process.env.STORAGE_MAX_FILE_SIZE_MB, 10)
    : 1;

  const maxFileSizeB = maxFileSizeMB * 1024 * 1024;

  if(contentLength && contentLength > maxFileSizeB) {
    throw new PayloadTooLargeException('File too large')
  }

  next();
};
