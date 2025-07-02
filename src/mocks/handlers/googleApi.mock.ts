import {
  http,
  HttpResponse,
} from 'msw'

export const googleApiHandlers = [
  http.get('https://maps.googleapis.com/maps/api/js*', () => {
    return HttpResponse.json({})
  }),
  http.get('https://maps.googleapis.com/maps-api-v3/api/js*', () => {
    return HttpResponse.json({})
  }),
  http.get('https://maps.googleapis.com/maps/api/mapsjs/gen_204*', () => {
    return HttpResponse.json({})
  }),
  http.post('https://places.googleapis.com/$rpc/google.maps.places.v1.Places/AutocompletePlaces', () => {
    return HttpResponse.json({})
  }),
]
