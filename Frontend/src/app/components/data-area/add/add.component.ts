import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { TypeModel } from 'src/app/models/type.model';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public event = new EventModel();
  public types: TypeModel[] = [];

  public constructor(private dataService: DataService, private router: Router, private location: Location) { }

  public async ngOnInit() {
    try {
      this.types = await this.dataService.getAllEventTypes();
      if (this.event.typeId === null) return;
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async send() {
    try {
      await this.dataService.addEvent(this.event);
      alert('Event has been successfully added');
      this.router.navigateByUrl('/list');
    } catch (err: any) {
      alert(err.message);
    }
  }

  public back(): void {
    this.location.back();
  }

}
