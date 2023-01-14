import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent implements OnInit{
  @Input()
  public event: EventModel;

  @Output()
  public onDelete = new EventEmitter();

  public timing: string;

  public constructor(private dataService: DataService) { }
  
  public ngOnInit(): void {
    if (new Date(this.event.date) > new Date()) {
      this.timing = 'Coming soon 🥳';
    } else {
      this.timing = 'Occurred';
    }
  }

  public async deleteEvent(): Promise<void> {
    try {
      if (!window.confirm('Are you sure?')) return;
      await this.dataService.deleteEvent(this.event._id);
      alert('Event successfully deleted');
      this.onDelete.emit();
    } catch (err: any) {
      alert(err.message);
    }
  }

}
