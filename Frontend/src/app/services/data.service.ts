import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TypeModel } from '../models/type.model';
import { EventModel } from '../models/event.model';
import { appConfig } from '../utils/app-config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public constructor(private http: HttpClient) { }

  // Get all event types
  public async getAllEventTypes(): Promise<TypeModel[]> {
    const observable = this.http.get<TypeModel[]>(appConfig.typesUrl);
    const eventTypes = await firstValueFrom(observable);
    return eventTypes;
  }

  // Get events by type
  public async getEventsByType(typeId: string): Promise<EventModel[]> {
    const observable = this.http.get<EventModel[]>(appConfig.eventsByTypeUrl + typeId);
    const events = await firstValueFrom(observable);
    return events;
  }

  // Add event
  public async addEvent(event: EventModel): Promise<void> {
    const observable = this.http.post<EventModel>(appConfig.eventsUrl, event);
    await firstValueFrom(observable);
  }

  // Delete event
  public async deleteEvent(_id: string): Promise<void> {
    const observable = this.http.delete(appConfig.eventsUrl + _id);
    await firstValueFrom(observable);
  }
}
