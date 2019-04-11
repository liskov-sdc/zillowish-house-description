import http from "k6/http";
import { check, fail } from "k6";

export let options = {
  rps: 1,
  vus: 10,
  duration: '30s'
};

export default function() {
  const url = 'http://localhost:3001/houses/1';
  let house = {
    street: '8837 Red Leaf Road',
    city:'Bloomington',
    state: 'IN',
    description: 'Reiciendis repellat aut optio consequatur enim iure laboriosam est aliquam. Explicabo placeat minus labore illum et',
    price: 8372625
  }
  let res = http.post(url, house);
  check(res, {
    "status was 201": (r) => r.status == 201,
    "transaction time OK": (r) => {
      console.log('Found the RES object', r.timings.duration);
      return r.timings.duration < 200
    }
  });
}
