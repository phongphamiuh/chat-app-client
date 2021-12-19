import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMETCHAT_CONSTANTS } from "../../../utils/messageConstants";
import * as enums from "../../../utils/enums";
import { UpdateImgRequest, UserService, UserUpdateRequest } from '../../Users/User-Service/user.service';
import { MessageService } from '../../Messages/Message-Service/message.service';

@Component({
  selector: 'cometchat-info-personal',
  templateUrl: './cometchat-info-personal.component.html',
  styleUrls: ['./cometchat-info-personal.component.css']
})
export class CometchatInfoPersonalComponent implements OnInit {
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
  @Input() user = null;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService) { }

  infoForm : FormGroup
  createBtnText: String = COMETCHAT_CONSTANTS.CREATE;
  addBtnText: String = COMETCHAT_CONSTANTS.UPDATE
  
  ADD_FRIENDS: String = COMETCHAT_CONSTANTS.PERSON_INFO
  isValidFormSubmitted = null;
  ngOnInit() {
    console.log("CometchatInfoPersonalComponent" + JSON.stringify(this.user))
    this.infoForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    },)

    this.infoForm.get('phone').setValue(this.user.phonenumber)
    this.infoForm.get('name').setValue(this.user.name)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.infoForm.controls;
  }

  updateInfo(){
    let userUpdate: UserUpdateRequest = {
      name: this.infoForm.get('name').value,
      birthday: 123
    }
    this.isValidFormSubmitted = false;
    if (this.infoForm.invalid) {
    }else{
      this.isValidFormSubmitted = true;
      this.userService.updateUser(this.user.id_user, userUpdate).subscribe(res => {
        console.log("update CometchatInfoPersonalComponent " + JSON.stringify(res))
        this.actionGenerated.emit({
          type: enums.UPDATE_INFO
        })
      })
    }

  }

  closeCreateGroupView() {
    try {
      this.actionGenerated.emit({
        type: enums.UPDATE_INFO,
        payLoad: null,
      });
    } catch (error) {
    }
  }


  onImgChange(event) {
    try {
      if (!event.target.files[0]) {
        return false;
      }
      const uploadedFile = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener(
        enums.LOAD,
        () => {
          const newFile = new File(
            [reader.result],
            uploadedFile.name,
            uploadedFile
          );

          this.messageService.updateFile(newFile).subscribe(res => {
            let ms = Date.now();
            console.log('res..............................' + JSON.stringify(res))
            let resI = res.url 

            this.user
            let urlUpdate: UpdateImgRequest = {
              url_avatar : resI
            }
            this.userService.update(this.user.id_user, urlUpdate).subscribe(res => {
              console.log('update' + res)
            })

          })

         // this.sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.IMAGE);
        },
        false
      );

      reader.readAsArrayBuffer(uploadedFile);

      this.actionGenerated.emit({
        type: enums.UPDATE_INFO
      })

     // this.imagePicker.nativeElement.value = "";
    } catch (error) {
    }
  }

}
