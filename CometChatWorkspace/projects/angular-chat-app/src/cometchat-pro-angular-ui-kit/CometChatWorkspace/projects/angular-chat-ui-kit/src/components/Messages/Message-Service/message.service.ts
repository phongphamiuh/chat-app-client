import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
const apiUrl = 'http://localhost:8080/messages';
const apiUrlLtn = 'http://localhost:8080/messagesltn';
const apiUrlNode = 'http://localhost:3000/MessageStored';
const apiUrlMessageData = 'http://localhost:8080/messagesdata';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private serverUrl = 'http://localhost:8080/socket'
  private title = 'WebSockets chat';
  private stompClient;

  private subject = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  getAllMessage(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(apiUrl).pipe()
  }

  getAllMessageByFrieds(uid: String, friendId: String): Observable<Message[]> {
    return this.httpClient.get<Message[]>(apiUrl + `/${uid}/${friendId}`).pipe()
  }

  getAllMessageByIdChatRoom(idChatRoom: string): Observable<RootObject>{
    return this.httpClient.get<RootObject>(apiUrlNode + `?id_chatroom=${idChatRoom}`).pipe()
  }

  getAllMessageByIdChatRoom1(idChatRoom: string): Observable<Messages[]>{
    return this.httpClient.get<Messages[]>(apiUrlMessageData + `/${idChatRoom}`).pipe()
  }

  getAllMessageLtn(): Observable<MessageLtn[]> {
    return this.httpClient.get<MessageLtn[]>(apiUrlLtn).pipe()
  }

  // sendMessage(message: Message): Observable<Message> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({'Content-Type': 'application/json'})
  //   }
  //   const body=JSON.stringify(message);
  //   return this.httpClient.post<Message>(apiUrl,body, httpOptions).pipe()
  // } 

  // sendMessage(id_chatroom: string,
  //             message:String,
  //             id_send: string,
  //             sentAt: number): Observable<Message> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({'Content-Type': 'application/json'})
  //   }
  //   const body=JSON.stringify(message);
  //   return this.httpClient.post<Message>(apiUrlNode + `?id_chatroom=${id_chatroom}&message=${message}&id_send=${id_send}&${sentAt}`, httpOptions).pipe()
  // } 

  sendMessage(chatroomId: string,message: Messages): Observable<Messages> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(message);
    return this.httpClient.post<Messages>(apiUrlMessageData + `/${chatroomId}`,body, httpOptions).pipe()
  } 

  sendMessageFile(chatroomId: string,message: MessagesFile): Observable<MessagesFile> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(message);
    return this.httpClient.post<MessagesFile>(apiUrlMessageData + `/${chatroomId}`,body, httpOptions).pipe()
  } 

  sendMessage1(chatroomId: string,message: Messages): Observable<Messages> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(message);
    return this.httpClient.post<Messages>(apiUrlMessageData + `/${chatroomId}`,body, httpOptions).pipe()
  } 

  deleteMessage(chatroomId: string,message: MessagesDelete, deleteAt: number, deletedBy: string): Observable<MessagesDelete> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(message);
    return this.httpClient.put<MessagesDelete>(apiUrlMessageData + `/${chatroomId}/${deleteAt}/${deletedBy}`,body, httpOptions).pipe()
  } 

    sendMessagess(message: any) {
      this.subject.next(message);
    }

    clearMessage() {
      this.subject.next();
    }

    getMessage(): Observable<void> {
      return this.subject.asObservable();
    }


  saveMessageLtn(message: MessageLtn): Observable<MessageLtn> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(message);
    return this.httpClient.post<MessageLtn>(apiUrlLtn,body, httpOptions).pipe()
  } 

  getMessageListenerById(id: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(apiUrlLtn).pipe()
  }

  deleteMessageListenerById(id: string) {
    return this.httpClient.delete(apiUrlLtn + `/${id}`).pipe()
  }

  initializeWebSocketConnection(idChatRoom: string){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      console.log('Connected: ' + frame);

      //console.log(that.stompClient.subscriptions)

      // for (const sub in that.stompClient.subscriptions) {
      //   console.log('sub ......................' + sub)
      //   if (that.stompClient.subscriptions.hasOwnProperty(sub)) {
      //     console.log('.............................')
      //     that.stompClient.unsubscribe(sub);
      //   }else{
          
      //   }
      // }

      that.stompClient.subscribe("/chat/" + idChatRoom, (message) => {
        console.log("in subscribe")
        var ar : Message
        ar = JSON.parse(message.body)
        that.sendMessagess(ar)
        

      },{id: idChatRoom});

      //that.removeMessageListener(idChatRoom)
    });
  }

  removeMessageListener(idChatRoom: string){
    console.log("unsub")
    this.stompClient.unsubscribe(idChatRoom)
  }

  _disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  sendMessageSocket(message){
    this.stompClient.send("/app/send/message" , {}, message);
  }

  updateFile(file: File): Observable<any> {
    const url = 'http://localhost:8080/storage/uploadFile'
    let formData : FormData = new FormData();
    formData.append('file',file)
    return this.httpClient.post<any>(url,formData,{reportProgress: true,responseType: 'text' as 'json'}).pipe()
    //formData.append(file)
  }

  /// group

  createGroup(){
    
  }
}

export interface ResponseMessage{
  message: string
}

export interface Content {
  id_chatroom: string;
  type: string;
  id_send: string;
  message: String;
  sentAt: number;
}

export interface Datum {
  content: Content[];
}

export interface RootObject {
  Data: Datum[];
}


export interface MessageResponse{
  data : Data[]
}

export interface Data{
  content: Content;
}

export interface Content {
  messages:Messages[]
}

export interface Messages {
  id_chatroom: string;
  type: string;
  id_send: string;
  message: String;
  sentAt: number;
}

export interface MessagesFile {
  id_chatroom: string;
  type: string;
  id_send: string;
  message: String;
  sentAt: number;
  fileUrl: string
}


export interface MessagesDelete {
  type: string;
  id_send: string;
  message: String;
  sentAt: number;
  deletedAt: number;
  deletedBy: number;
}

// export interface Messages {
//   data: Content[];
// }


export class Entity {
  uid: string;
  name: string;
  role: string;
  avatar: string;
  status: string;
  lastActiveAt: number;
  conversationId: String
}

export class Sender {
  entity: Entity;
  entityType: string;
}


export class Receiver {
  entity: Entity;
  entityType: string;
}

export class Entities {
  sender: Sender;
  receiver: Receiver;
}

export class Data {
  text: String;
  entities: Entities;
  resource: string;
}

export class Message {
  conversationId: string;
  sender: string;
  receiverType: string;
  receiver: string;
  category: string;
  type: string;
  data: Data;
  sentAt: number;
  updatedAt: number;
}

export class MessageLtn {
  id: string;
  conversationId: string;
  sender: string;
  receiverType: string;
  receiver: string;
  category: string;
  type: string;
  data: Data;
  sentAt: number;
  updatedAt: number;
}

