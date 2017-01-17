import { Component, ViewChild, OnInit, ElementRef, HostListener } from '@angular/core';

import { GameService } from './game.service';

// import { UUID } from 'angular2-uuid';

import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ GameService ]
})
export class AppComponent implements OnInit{

  id: string = Math.random().toString();
  me: any = {x: 0, y: 0, r: 5, id: this.id};
  @ViewChild("myCanvas") canvas: ElementRef; 
  
  @HostListener('window:keydown', ['$event']) keyboardInput(event: any) {
    console.log('event: ' + event.keyCode);
    if(event.keyCode == 37) {
      this.me.x -= 1;
    } else if(event.keyCode == 38) {
      this.me.y += 1;
    }else if(event.keyCode == 39) {
      this.me.x += 1;
    }else if(event.keyCode == 40) {
      this.me.y -= 1;
    }
    this.game.myPosition.next(this.me);
  }

  constructor(private game: GameService) {}

  ngOnInit() {
    this.game.elements.subscribe((elements) => {
      let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
      context.clearRect(0, 0, 1600, 800);
      _.forEach(elements, (ele) => {
        this.drawCircle(ele.x, ele.y, ele.r);
      });
    });
  }

  drawCircle(x: number, y: number, r:number) {
    let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    context.beginPath();
    context.arc(x,y,r,0,2*Math.PI);
    context.stroke();
  }

}
