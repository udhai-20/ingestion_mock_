import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Ingestion') // Group APIs under "Ingestion" in Swagger
@Controller('/ingestion')
export class AppController {
  constructor(private readonly ingestionService: AppService) {}

  @Post()
  @ApiOperation({ summary: 'Start Document Ingestion', description: 'Starts processing a document by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        documentId: { type: 'string', example: '12345' },
      },
      required: ['documentId'],
    },
  })
  @ApiResponse({ status: 201, description: 'Document ingestion started successfully' })
  async startIngestion(@Body('documentId') documentId: string, @Req() req: any) {
    return await this.ingestionService.processDocument(documentId);
  }

  // @Get(':id/getStatus')
  // @ApiOperation({ summary: 'Reprocess Document', description: 'get Status a document by ID' })
  // @ApiParam({ name: 'id', type: 'string', example: '12345', description: 'Document ID' })
  // @ApiResponse({ status: 200, description: 'Document reprocessed successfully' })
  // async getStatus(@Param('id') documentId: string) {
  //   return await this.ingestionService.getDocumentStatus(documentId);
  // }

  @Get(':id/embeddings')
  @ApiOperation({ summary: 'Get Document Embeddings', description: 'Retrieves embeddings for a document' })
  @ApiParam({ name: 'id', type: 'string', example: '12345', description: 'Document ID' })
  @ApiResponse({ status: 200, description: 'Returns the embeddings of the document' })
  async getEmbeddings(@Param('id') documentId: string) {
    return this.ingestionService.getMockEmbeddings(documentId);
  }
}
