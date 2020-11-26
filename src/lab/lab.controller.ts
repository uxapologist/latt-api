import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LabService } from './lab.service';
import { LabEntity } from './lab.entity';
import { ID } from '../shared/models/id.model';
import { ValidationPipe } from '../shared/util/validation.pipe';
import { AuthGuard } from '../shared/util/auth.guard';
import { LabDto } from './lab.dto';

@ApiTags('labs')
@Controller('labs')
export class LabController {
  private logger = new Logger('LabController');

  constructor(private labService: LabService) {}

  @Get()
  @ApiOperation({ summary: 'Get available labs' })
  @ApiResponse({
    status: 200,
    description: 'The list of available labs',
  })
  getLabs(): Promise<LabEntity[]> {
    return this.labService.getLabs();
  }

  @Get(':labId')
  @ApiOperation({ summary: 'Get specific lab data by its id' })
  @ApiResponse({
    status: 200,
    description: 'The lab data',
  })
  getLab(@Param('labId') labId: ID): Promise<LabEntity> {
    return this.labService.getLab(labId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a lab' })
  @ApiResponse({
    status: 200,
    description: 'The lab data',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(new AuthGuard())
  createLab(@Body() labData: LabDto): Promise<LabEntity> {
    this.logger.log(JSON.stringify(labData));
    return this.labService.createLab(labData);
  }

  @Patch(':labId')
  @ApiOperation({ summary: 'Update specific lab data' })
  @ApiResponse({
    status: 200,
    description: 'The lab data',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(new AuthGuard())
  updateLab(@Param('labId') labId: ID, @Body() labData: LabDto): Promise<LabEntity> {
    this.logger.log(JSON.stringify(labData));
    return this.labService.updateLab(labId, labData);
  }

  @Delete(':labId')
  @ApiOperation({ summary: 'Delete specific lab' })
  @ApiResponse({
    status: 200,
    description: 'Is the specified lab deleted successfully',
  })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  deleteLab(@Param('labId') labId: ID) {
    return this.labService.deleteLab(labId);
  }
}
