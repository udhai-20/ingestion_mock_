import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private documentStatus = new Map<string, string>(); // Stores status in-memory
  private baseUrl = "http://localhost:3000/documents"

  async processDocument(documentId: string) {
    this.documentStatus.set(documentId, 'processing');

    setTimeout(async () => {
      const isSuccess = Math.random() > 0.2;
      this.documentStatus.set(documentId, isSuccess ? 'completed' : 'failed');
      const documentStatus = this.documentStatus.get(documentId)
      await axios.patch(`${this.baseUrl}/updateStatus/${documentId}`, {
        documentStatus
      }, {
        headers: {
          'x-internal-request': "your_jwt_secret_key_change_in_production",
          
        },
      })
    }, 5000); // 5-second delay

    return { documentId, status: 'processing' };
  }

   async getDocumentStatus(documentId: string) {
    return { documentId, status: this.documentStatus.get(documentId) || 'Not Found' };
  }
  async getMockEmbeddings(documentId: string) {
    return {
      documentId,
      embeddings: Array(10).fill(0).map(() => Math.random().toFixed(4)),
    };
  }

}
