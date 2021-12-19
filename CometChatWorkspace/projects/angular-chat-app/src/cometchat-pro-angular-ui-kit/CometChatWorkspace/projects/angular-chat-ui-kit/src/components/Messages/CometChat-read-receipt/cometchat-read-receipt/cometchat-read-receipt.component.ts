import { Component, Input, OnInit } from "@angular/core";
import { getSentAtTime } from "../../../../utils/common";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
import * as enums from "../../../../utils/enums";

@Component({
  selector: "cometchat-read-receipt",
  templateUrl: "./cometchat-read-receipt.component.html",
  styleUrls: ["./cometchat-read-receipt.component.css"],
})
export class CometChatReadReceiptComponent implements OnInit {
  @Input() messageDetails = null;
  @Input() displayReadReciept = true;

  tickStatus: String;
  time;

  SENT: String = COMETCHAT_CONSTANTS.SENT;
  DELIVERED: String = COMETCHAT_CONSTANTS.DELIVERED;
  READ: String = enums.READ;
  constructor() {}

  ngOnInit() {
    try {

      console.log("message read  ..... " + JSON.stringify(this.messageDetails))
      this.getDeliveryStatus();
      this.time = getSentAtTime(this.messageDetails);

      console.log('time send' + this.time)
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Get Read/Deliv/Sent Status
   */
  getDeliveryStatus() {
    try {
      if (this.messageDetails.hasOwnProperty(enums.SEND_AT)) {
        this.tickStatus = this.SENT;

        if (this.messageDetails.hasOwnProperty(enums.DELIVERED_AT)) {
          this.tickStatus = this.DELIVERED;
        }
        if (this.messageDetails.hasOwnProperty(enums.READ_AT)) {
          this.tickStatus = this.READ;
        }
      }
    } catch (error) {
      logger(error);
    }
  }
}
