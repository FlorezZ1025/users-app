import { EventEmitter, Injectable } from "@angular/core";
import { User } from "../core/interfaces/user.interface";

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {
    private userEventEmitter = new EventEmitter<User>();
    private deleteUserEventEmitter = new EventEmitter<number>();
    private pageUserEventEmitter = new EventEmitter<any>();
    private handlerLoginEventEmitter = new EventEmitter<any>();


    get userEmitter(): EventEmitter<User> {
        return this.userEventEmitter;
    }
    get deleteUserEmitter(): EventEmitter<number> {
        return this.deleteUserEventEmitter;
    }
    get pageUserEmitter(): EventEmitter<any> {
        return this.pageUserEventEmitter;
    }
    get handlerLoginEmitter(){
        return this.handlerLoginEventEmitter;
    }
}