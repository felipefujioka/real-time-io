import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import * as io from 'socket.io-client';

@Injectable()
export class GameService {

  elements: BehaviorSubject<any>;
  myPosition: BehaviorSubject<any>;
  socket: any;

  constructor() {
    this.elements = new BehaviorSubject<any>({});
    this.socket = this.create();
    this.myPosition = new BehaviorSubject<any>({});
    this.myPosition.subscribe((pos) => {
      this.socket.emit("input", pos);
    });
  }

  create() {
    var self = this;
    var socket = io('ws://192.168.99.100:4002');

    socket.on('connect', this.onConnect.bind(this));

    socket.on('message', this.onMessage.bind(this));

    socket.on('disconnect', this.onDisconnect.bind(this));

    return socket;
  }

  onConnect() {
    console.log('connected');
  }

  onMessage(elements) {
    this.elements.next(elements);
  }

  onDisconnect() {
    console.log('disconnected');
  }

}
