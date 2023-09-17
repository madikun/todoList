import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isLive(): string {
    return 'Service is available';
  }
}
