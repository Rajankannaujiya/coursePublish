import { register, Counter, Histogram, Gauge } from "prom-client";
import { CounterLogDetailsType, HistogramLogDetailsType } from "./types";

const counter = new Counter({
  name: "web_server_events",
  help: "web_server_events server api counter",
  labelNames: ["event", "statusCode"],
});

export const activeUserGauge = new Gauge({
  name: "active_users_count",
  help: "Number of active users currently connected",
});

const histogram = new Histogram({
  name: "web_server_processing_time",
  help: "web_server data fetching and processing time",
  labelNames: ["event", "statusCode"],
  buckets: [
    0.1, 5, 15, 50, 100, 250, 500, 750, 1000, 1500, 2000, 5000, 10000, 15000,
    20000,
  ],
});
register.registerMetric(counter);
register.registerMetric(activeUserGauge);

export const sendPrometheus = (logDetails: CounterLogDetailsType) => {
  try {
    const { event, statusCode } = logDetails || {};
    counter.labels(event, statusCode).inc();
  } catch (error) {
    console.log("Prometheus counter event error", error);
  }
};

export const sendPrometheusResponseTime = (
  logDetails: HistogramLogDetailsType
) => {
  try {
    const { event, statusCode, responseTime } = logDetails || {};

    if (!event || !statusCode || !responseTime) return;

    histogram.labels(event, statusCode).observe(responseTime / 1000);
  } catch (error) {
    console.log("Prometheus Histogram event error", error);
  }
};




 