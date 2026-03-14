import ServiceDetail from "./ServiceDetail";
import { SERVICES_DATA } from "./servicesData";

export default function DataEngineeringPage() {
  return <ServiceDetail service={SERVICES_DATA["data-engineering"]} />;
}