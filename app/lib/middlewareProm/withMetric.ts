
import { sendPrometheus, sendPrometheusResponseTime } from "@/app/lib/metrics";

export function withMetrics(
  handler: (req: Request) => Promise<Response>,
  eventName: string
) {
  return async (req: Request) => {
    const start = Date.now();

    try {
      const res = await handler(req);

      sendPrometheus({
        event: eventName,
        statusCode: String(res.status),
      });

      sendPrometheusResponseTime({
        event: eventName,
        statusCode: String(res.status),
        responseTime: Date.now() - start,
      });

      return res;
    } catch (error) {
        console.log(error)
      sendPrometheus({
        event: eventName,
        statusCode: "500",
      });

      sendPrometheusResponseTime({
        event: eventName,
        statusCode: "500",
        responseTime: Date.now() - start,
      });

      return new Response("Internal Server Error", { status: 500 });
    }
  };
}
