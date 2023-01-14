import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { TypeModel } from 'src/app/models/type.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public date: Date = new Date();
  public types: TypeModel[] = [];
  public events: EventModel[] = [];
  public selectedValue: string = '';
  public viewMode: string = 'grid';
  
  public constructor(private dataService: DataService) { }

  public async ngOnInit() {
    try {
      // Get all event types
      this.types = await this.dataService.getAllEventTypes();
    } catch (err: any) {
      alert(err.message);
    }
  }

  // Show events by type
  public async displayEvents() {
    try {
      this.events = await this.dataService.getEventsByType(this.selectedValue);
    } catch (err: any) {
      alert(err.message)
    }
  }

  public async deleteMe(_id: string) {
    try {
      if (!window.confirm('Are you sure?')) return;
      await this.dataService.deleteEvent(_id);
      alert('event has been deleted');
      const index = this.events.findIndex(e => e._id === _id);
      this.events.splice(index, 1);
    } catch (err: any) {
      alert(err.message);
    }
  }

  // Handle delete (from card)
  public handleDelete(_id: string) {
    this.events.splice(this.events.findIndex(e => e._id === _id), 1);
  }

  public getTiming(e: EventModel) {
    if (new Date(e.date) > new Date()) {
      return 'Coming soon 🥳';
    } else {
      return 'Occurred';
    }
  }

}
