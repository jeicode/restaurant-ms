import { environment } from "./config/enviroment";
import { consumeOrders } from "./consumer";
import { runServer } from "./server";
// consumeOrders();

runServer({ PORT: environment.PORT });
