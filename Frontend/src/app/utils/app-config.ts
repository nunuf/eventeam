class AppConfig {

  public typesUrl = 'http://localhost:3001/api/types/';
  public eventsByTypeUrl = 'http://localhost:3001/api/events-by-type/';
  public eventsUrl = 'http://localhost:3001/api/events/';

}

export const appConfig = new AppConfig();