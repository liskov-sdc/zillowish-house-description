import http from "k6/http";
import { check } from "k6";
import { Rate } from 'k6/metrics';
import { getRandomInt } from '../database/generate_fake_data.js';

let failRate = new Rate('failed requests');

export const options = {
  rps: 1000,
  vus: 70,
  duration: "4m",
  thresholds: {
    'failed requests': ['rate < 0.1']
  }
};

export default function() {
  let id = getRandomInt(9000000, 10000000);
  let res = http.get(`http://localhost:3001/${id}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 2000,
    'failed requests': (r) => failRate.add(r.status !== 200)
  });
};
