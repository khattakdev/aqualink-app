import {
  Controller,
  Post,
  UploadedFile,
  Body,
  Req,
  Param,
  ParseIntPipe,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { AcceptFile } from '../uploads/file.decorator';
import { Auth } from '../auth/auth.decorator';
import { AdminLevel } from '../users/users.entity';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { Survey } from './surveys.entity';
import { SurveysService } from './surveys.service';
import { CreateSurveyMediaDto } from './dto/create-survey-media.dto';
import { SurveyMedia } from './survey-media.entity';
import { EditSurveyDto } from './dto/edit-survey.dto';
import { EditSurveyMediaDto } from './dto/edit-survey-media.dto';

@Controller('surveys')
export class SurveysController {
  constructor(private surveyService: SurveysService) {}

  @Auth(AdminLevel.ReefManager, AdminLevel.SuperAdmin)
  @Post('upload')
  @AcceptFile('file', ['image', 'video'], 'surveys', 'reef')
  upload(@UploadedFile('file') file: any): Promise<string> {
    return file.path;
  }

  @Auth(AdminLevel.ReefManager, AdminLevel.SuperAdmin)
  @Post()
  create(
    @Body() createSurveyDto: CreateSurveyDto,
    @Req() req: any,
  ): Promise<Survey> {
    return this.surveyService.create(createSurveyDto, req.user);
  }

  @Auth(AdminLevel.ReefManager, AdminLevel.SuperAdmin)
  @Post(':id/media')
  createMedia(
    @Body() createSurveyMediaDto: CreateSurveyMediaDto,
    @Param('id', ParseIntPipe) surveyId: number,
  ): Promise<SurveyMedia> {
    return this.surveyService.createMedia(createSurveyMediaDto, surveyId);
  }

  @Get('reefs/:id')
  find(@Param('id', ParseIntPipe) reefId: number): Promise<Survey[]> {
    return this.surveyService.find(reefId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) surveyId: number): Promise<Survey> {
    return this.surveyService.findOne(surveyId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) surveyId: number,
    @Body() editSurveyDto: EditSurveyDto,
  ): Promise<Survey> {
    return this.surveyService.update(editSurveyDto, surveyId);
  }

  @Put('media/:id')
  updateMedia(
    @Param('id', ParseIntPipe) mediaId: number,
    @Body() editSurveyMediaDto: EditSurveyMediaDto,
  ): Promise<SurveyMedia> {
    return this.surveyService.updateMedia(editSurveyMediaDto, mediaId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) surveyId: number): Promise<void> {
    return this.surveyService.delete(surveyId);
  }

  @Delete('media/:id')
  deleteMedia(@Param('id', ParseIntPipe) mediaId: number): Promise<void> {
    return this.surveyService.deleteMedia(mediaId);
  }
}
