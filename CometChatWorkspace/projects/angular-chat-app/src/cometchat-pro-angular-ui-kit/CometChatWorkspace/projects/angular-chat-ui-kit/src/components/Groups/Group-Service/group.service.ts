import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const publicApi = "http://localhost:3000/Chatroom"
const publicApiGroupMember = "http://localhost:3000/Chatroom/group/member"
@Injectable({
  providedIn: 'root'
})
export class GroupService {
  
  constructor(private httpClient: HttpClient) { }

  getAllGroupByUserId(uid: String){
    return this.httpClient.get(publicApi + `/group?id_user=${uid}`)
  }

  createGroup(){
    
  }

  getAllMemberByGroupId(id_chatroom: String): Observable<GroupMembers[]> {
    return this.httpClient.get<GroupMembers[]>(publicApiGroupMember + `?id_chatroom=${id_chatroom}`)
  }



  addMemberToGroup(idChatGroup: string, idUser: string, role: string, idUserAdd: string){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.post(publicApi + `/addmember?id_chatgroup=${idChatGroup}&id_user=${idUser}&role=${role}&id_user_add=${idUserAdd}`,httpOptions).pipe()
  }

  addMemberToGroup1(idChatRoom: string, idUserMember: string, idUserAddMember: string){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.post(publicApiGroupMember + `?id_chatroom=${idChatRoom}&id_user_member=${idUserMember}&id_user_add_member=${idUserAddMember}`,httpOptions).pipe()
  }

  kickMember(idChatRoom:String, id_user_member: String) {
    return this.httpClient.delete(publicApiGroupMember + `?id_chatroom=${idChatRoom}&id_user_member=${id_user_member}`)
  }


  

}

export interface GroupMembers {
  id_chatroom: string;
  id_user: string;
  role: string;
  id_user_add: String;
}