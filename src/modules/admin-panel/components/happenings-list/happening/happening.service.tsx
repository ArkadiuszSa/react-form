import * as moment from 'moment';
import http from '../../../helpers/http'

export interface HappeningData {
  title?: string,
  description?: string,
  price?: string,
  days?: string[],
  selectedDates?: any[]
}

export interface ServerData {
  data: HappeningData
}

export interface Happening {
  title?: string,
  description?: string,
  price?: string,
  days?: string[],
}

export default class HappeningService {
  constructor() {

  }

  getHappening(id) {
    return http.get("http://localhost:4000/api/happening/" + id)
      .then((response: ServerData) => {
        let dates = [];
        
        for (let date of response.data.days) {
          dates.push(moment(date))
        }

        return {
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          days: response.data.days,
          selectedDates:dates,
        }
      })
  }


}
