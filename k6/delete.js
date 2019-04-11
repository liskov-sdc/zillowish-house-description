import http from "k6/http";
import { check, fail } from "k6";
import { makeHouseEntry, getRandomInt } from '../database/generate_fake_data.js';
import { Rate } from 'k6/metrics';

let failRate = new Rate('failed requests');

export let options = {
  rps: 1000,
  vus: 50,
  duration: '1m',
  thresholds: {
    'failed requests': ['rate < 0.1']
  }
};

export default function() {
  let id = getRandomInt(9000000, 10000000);
  let url = `http://localhost:3001/houses/${id}`;
  let house = makeHouseEntry();
  let res = http.delete(url, house);
  check(res, {
    "status was 201": (r) => r.status == 202,
    "transaction time OK": (r) => r.timings.duration < 2000,
    'failed requests': (r) => failRate.add(r.status !== 202)
  });
}