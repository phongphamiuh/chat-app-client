import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { logger } from "../../../../utils/common";
import { GroupService } from "../../Group-Service/group.service";

@Component({
  selector: "cometchat-group-list-item",
  templateUrl: "./cometchat-group-list-item.component.html",
  styleUrls: ["./cometchat-group-list-item.component.css"],
})
export class CometChatGroupListItemComponent implements OnInit {
  @Input() group = null;
  @Input() selectedGroup = null;

  @Output() onGroupClick: EventEmitter<any> = new EventEmitter();

  countMember = 0

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.groupService.getAllMemberByGroupId(this.group.id_chatroom).subscribe(g => {
      this.countMember = g.length
    })
  }

  /**
   * Emitting the Group clicked so that it can be used in the parent component
   * @param Any group
   */
  groupClicked(group) {
    try {
      this.onGroupClick.emit(group);
    } catch (error) {
      logger(error);
    }
  }
}
