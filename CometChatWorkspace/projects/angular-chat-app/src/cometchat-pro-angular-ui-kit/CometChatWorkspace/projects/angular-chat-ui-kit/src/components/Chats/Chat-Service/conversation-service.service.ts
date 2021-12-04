import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const apiUrl = 'http://localhost:8080/conversations';

const apiChatRoom = 'http://localhost:3000/Chatroom';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private httpClient: HttpClient) { }

  
  getAllConversation(): Observable<Conversation[]> {
    return this.httpClient.get<Conversation[]>(apiUrl).pipe()
  }

 
}

export class Conversation {
  conversationId: string;
  conversationType: string;
  withName: string;
  withUid: string;
  withRole: string;
}
