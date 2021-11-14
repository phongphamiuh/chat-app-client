import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export class WebSocketAPI {
    private serverUrl = 'http://localhost:8080/socket'
    private title = 'WebSockets chat';
    private stompClient;
  
    initializeWebSocketConnection(){
        let ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        let that = this;
        this.stompClient.connect({}, function(frame) {
          that.stompClient.subscribe("/chat", (message) => {
            console.log("message ................." + message.body)
            this.appComponent.handleMessage(JSON.stringify(message.body));
          });
        });
      }
    
      sendMessageSocket(message){
        this.stompClient.send("/app/send/message" , {}, message);
      }
}
    