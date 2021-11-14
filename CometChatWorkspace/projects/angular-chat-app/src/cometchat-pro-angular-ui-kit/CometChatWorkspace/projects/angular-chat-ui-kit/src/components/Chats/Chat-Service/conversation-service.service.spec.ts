import { TestBed } from '@angular/core/testing';

import { ConversationServiceService } from './conversation-service.service';

describe('ConversationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConversationServiceService = TestBed.get(ConversationServiceService);
    expect(service).toBeTruthy();
  });
});
