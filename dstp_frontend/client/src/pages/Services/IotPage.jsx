import ServiceDetail from "./ServiceDetail";
import { SERVICES_DATA } from "./servicesData";

export default function IotPage() {
  return <ServiceDetail service={SERVICES_DATA["iot"]} />;
}