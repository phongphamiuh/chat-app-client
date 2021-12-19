import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../Messages/Message-Service/message.service';

const apiUrl = 'http://localhost:8080/users';
const apiUrlVari = 'http://ec2-13-213-52-25.ap-southeast-1.compute.amazonaws.com:3000/Users';
const apiUrlConversation = 'http://ec2-13-213-52-25.ap-southeast-1.compute.amazonaws.com:3000/Chatroom'
const apiUrlFriends = 'http://ec2-13-213-52-25.ap-southeast-1.compute.amazonaws.com:3000/Friend'

const apiUrlFriendRequest = 'http://ec2-13-213-52-25.ap-southeast-1.compute.amazonaws.com:3000/Friendrequest'

const apiss = 'http://ec2-13-213-52-25.ap-southeast-1.compute.amazonaws.com:3000/Conversations'
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

  update(uid: String, urlUpdate: UpdateImgRequest): Observable<ResponseMessage> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const body = JSON.stringify(urlUpdate);
    return this.httpClient.put<ResponseMessage>(apiUrlVari + `/${uid}`, body, httpOptions).pipe()

   // return this.httpClient.get<ResponseMessage>(apiUrlVari +`/${uid}`).pipe()
  }

  updateUser(uid: String, urlUpdate: UserUpdateRequest): Observable<ResponseMessage> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const body = JSON.stringify(urlUpdate);
    return this.httpClient.put<ResponseMessage>(apiUrlVari + `/${uid}`, body, httpOptions).pipe()

   // return this.httpClient.get<ResponseMessage>(apiUrlVari +`/${uid}`).pipe()
  }


  save(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(user);
    return this.httpClient.post<User>(apiUrl,body,httpOptions)
  }

  saveVari(uid: String,name: String, phone: String): Observable<ResponseMessage> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    let of = 'online'
    //const body=JSON.stringify(user);
    return this.httpClient.post<ResponseMessage>(apiUrlVari + `?id_user=${uid}&name=${name}&phonenumber=${phone}&status=${of}`,httpOptions)
  }

  getFriendsByUser(uid: String): Observable<User[]> {
    return this.httpClient.get<User[]>(apiUrl +`/${uid}` + '/friends').pipe()
  }

  getFriendsByUserId(uid: String): Observable<UserData[]>{ 
    return this.httpClient.get<UserData[]>(apiUrlVari + `?id_user=${uid}`).pipe()
  }

  getConversationByUserId(uid: String): Observable<Conversation[]>{ 
    return this.httpClient.get<Conversation[]>(apiUrlConversation + `/conversation/?id_user=${uid}`).pipe()
  }

  getUserNotPersonal(idChatRoom: String, idUser): Observable<Conversation1>{
    return this.httpClient.get<Conversation1>(apiUrlVari + `/personal/w?id_chatroom=${idChatRoom}&id_user=${idUser}`)
  }

  getConverByUserId(uid: String): Observable<Conversation[]>{ 
    return this.httpClient.get<Conversation[]>(apiss + `?id_user=${uid}`).pipe()
  }

  addFriend(id: String, idFriend: String): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.get<User>(apiUrl + `/${id}/${idFriend}/friends`).pipe()
  }

  getGroupByUserId(uid: String): Observable<Conversation[]>{ 
    return this.httpClient.get<Conversation[]>(apiUrlConversation + `/group/?id_user=${uid}`).pipe()
  }

  getAllFriendsByUserId(uid: String): Observable<UserData[]>{
    return this.httpClient.get<UserData[]>(apiUrlFriends + `/listUser?id_user=${uid}`)
  }

  sendRequestAddFriend(idUser: string, idUserRequest: string){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.post(apiUrlFriendRequest + `?id_user=${idUser}&id_user_request=${idUserRequest}`,httpOptions)
  }

  getUserByPhone(phoneNumber: string): Observable<UserData>{
    return this.httpClient.get<UserData>(apiUrlVari + `/phonenumber?phonenumber=${phoneNumber}`)
  }

  getAllListRequestFriends(uid: string): Observable<UserData[]> {
    return this.httpClient.get<UserData[]>(apiUrlFriendRequest + `/listUser?id_user=${uid}`)
  }

  confirmRequestFriends(idUser: string, idUserRequest: string): Observable<ResponseMessage> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.post<ResponseMessage>(apiUrlFriends + `?id_user=${idUser}&id_user_request=${idUserRequest}`,httpOptions)
  }

  deleteRequestFriends(idUser: string, idUserRequest: string): Observable<ResponseMessage> {
    return this.httpClient.delete<ResponseMessage>(apiUrlFriendRequest + `?id_user=${idUser}&id_user_request=${idUserRequest}`)
  }

  checkUserIsFriend(idUser: string, idUserRequest: string): Observable<ResponseMessageCheckUserFriend> {
    return this.httpClient.get<ResponseMessageCheckUserFriend>(apiUrlFriends + `?id_user=${idUser}&id_user_check=${idUserRequest}`)
  }

  deleteFriend(idUser: string, idFriend: string): Observable<ResponseMessage> {
    return this.httpClient.delete<ResponseMessage>(apiUrlFriends + `?id_user=${idUser}&id_friend=${idFriend}`)
  }


  //add chat room
 
  addChatRoom(idUser: string, idUserRequest: string):  Observable<ResponseMessage> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.post<ResponseMessage>(apiUrlConversation + `?id_user=${idUser}&id_user_request=${idUserRequest}`, httpOptions)
  }


  searchUser(idUser:String,char: String, idChatGroup: String): Observable<UserData[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.get<UserData[]>(apiUrlVari + `/search/abc?id_user=${idUser}&char=${char}&id_chatgroup=${idChatGroup}`, httpOptions)
  }

}

export interface UserUpdateRequest{
  name: string;
  birthday: number;
}

export interface UpdateImgRequest{
  url_avatar: string;
}
export interface ResponseMessage {
  message: string
}

export interface ResponseMessageCheckUserFriend {
  id_user: string;
  id_friend: string
}

export interface Conversation1 {
  id_user: string;
  id_chatroom: string;
  name_chatroom: string;
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