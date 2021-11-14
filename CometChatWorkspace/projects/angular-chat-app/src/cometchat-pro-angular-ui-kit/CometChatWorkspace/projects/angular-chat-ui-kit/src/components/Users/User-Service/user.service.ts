import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:8080/users';
const apiUrlVari = 'http://localhost:3000/Users';
const apiUrlConversation = 'http://localhost:3000/Chatroom'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(apiUrl).pipe()
  }

  getUserById(uid: String): Observable<User> {
    return this.httpClient.get<User>(apiUrl +`/${uid}`).pipe()
  }

  getUserById1(uid: String): Observable<UserData> {
    return this.httpClient.get<UserData>(apiUrlVari +`/${uid}`).pipe()
  }

  save(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(user);
    return this.httpClient.post<User>(apiUrl,body,httpOptions)
  }

  saveVari(uid: String,name: String, phone: String): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    //const body=JSON.stringify(user);
    return this.httpClient.post<User>(apiUrlVari + `?id_user=${uid}&name=${name}&phone=${phone}`,httpOptions)
  }

  getFriendsByUser(uid: String): Observable<User[]> {
    return this.httpClient.get<User[]>(apiUrl +`/${uid}` + '/friends').pipe()
  }

  getFriendsByUserId(uid: String): Observable<UserData[]>{ 
    return this.httpClient.get<UserData[]>(apiUrlVari + `?id_user=${uid}`).pipe()
  }

  getConversationByUserId(uid: String): Observable<Conversation[]>{ 
    return this.httpClient.get<Conversation[]>(apiUrlConversation + `?id_user=${uid}`).pipe()
  }

  addFriend(id: String, idFriend: String): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.get<User>(apiUrl + `/${id}/${idFriend}/friends`).pipe()
  }

}
export interface Conversation {
  id_chatroom: string;
  create_date: number;
  is_group_chat: number;
  id_admin: string;
  message_newest: string;
  datetime_newest: number;
  name_chatroom: string;
  url_ava_chatroom: string;
  status: string;
}

export class UserData {
  id_user: string;
  name: string;
  birthday: Date;
  phonenumber: string;
  address: string;
  url_avatar: string;
  status: string;
  create_date: Date
}

export class User {
  conversationId: string;
  name: string;
  role: string;
  uid: string;
  status: string
  friends: Friend[]
}

export class Friend {
  conversationId: string;
  name: string;
  role: string;
  uid: string;
  status: string
}