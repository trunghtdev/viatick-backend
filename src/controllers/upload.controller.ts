import { extname } from 'path'
import { diskStorage } from 'multer'
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { idGenerator } from '@utils'

@Controller('upload-file')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('rawImage', {
      limits: {
        fileSize: 10000000
      },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
          return callback(new Error('Only image files are allowed!'), false)
        }
        callback(null, true)
      },
      storage: diskStorage({
        destination:
          process.env.NODE_ENV === 'production'
            ? '/var/www/data/images/env/'
            : './uploads/images/',
        filename(_, file, callback) {
          callback(null, idGenerator.mainId() + extname(file.originalname))
        }
      })
    })
  )
  async uploadImage(@UploadedFile() file) {
    if (file.mimetype.includes('image')) {
      return file.path.split('/').pop()
    }
    return null
  }

  @Get('remove/:idFile')
  async removeImage(@Param('idFile') idFile: string) {
    try {
      require('fs').unlinkSync(
        process.env.NODE_ENV === 'production'
          ? `/var/www/data/images/env/${idFile}`
          : `./uploads/images/${idFile}`
      )
      return true
    } catch (err) {
      throw err
    }
  }

  @Post('document')
  @UseInterceptors(
    FileInterceptor('rawDocument', {
      limits: {
        fileSize: 10000000
      },
      fileFilter: (req, file, callback) => {
        // comment these to unblock image file
        // if (file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
        //   return callback(new Error('Only document files are allowed!'), false)
        // }
        callback(null, true)
      },
      storage: diskStorage({
        destination:
          process.env.NODE_ENV === 'production'
            ? '/var/www/data/document/env/'
            : './uploads/document/',
        filename(_, file, callback) {
          callback(null, idGenerator.mainId() + extname(file.originalname))
        }
      })
    })
  )
  async uploadDocument(@UploadedFile() file) {
    return file.path.split('/').pop()
  }

  @Get('remove-document/:idFile')
  async removeDocument(@Param('idFile') idFile: string) {
    try {
      require('fs').unlinkSync(
        process.env.NODE_ENV === 'production'
          ? `/var/www/data/document/env/${idFile}`
          : `./uploads/document/${idFile}`
      )
      return true
    } catch (err) {
      throw err
    }
  }
}
