import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto, UpdateDocumentDto } from '@ys/shared';

// For the backend, we redefine the simple DTOs using NestJS validation (optional for this skeleton)
// Or simply use the types imported from shared (if they resolve correctly).
// The issue is `shared` is just a package. It exports interfaces, which are fine for typing.

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(@Body() createDocumentDto: { title: string; content?: string }) {
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentDto: { title?: string; content?: string }) {
    return this.documentService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentService.remove(id);
  }
}
