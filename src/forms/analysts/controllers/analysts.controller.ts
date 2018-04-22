import { Controller, Post, Body, Get, HttpCode, HttpStatus, Request, ParseIntPipe, Param } from '@nestjs/common';
import { CreateAnalystRequest } from '../requests/create-analyst.request';
import { User } from '../../../common/decorators/user.decorator';
import { AnalystsService } from '../services/analysts.service';
import { ApiResponse, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';

@Controller('analysts')
@ApiBearerAuth()
export class AnalystsController {
  constructor(private readonly analystsService: AnalystsService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'E-mail is already registered for an user\'s analyst.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  async create(@User() loggedUser, @Body() request: CreateAnalystRequest) {
    return await this.analystsService.create(loggedUser, request);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Analysts returned for user successfully.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  async findAll(@User() loggedUser) {
    return await this.analystsService.findAll(loggedUser);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Analyst returned for user successfully.'})
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid id.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 404, description: 'Not found. Analyst wasn\'t found for user.'})
  async findById(@User() loggedUser, @Param('id', new ParseIntPipe()) id) {
    return await this.analystsService.findById(loggedUser, id);
  }
}