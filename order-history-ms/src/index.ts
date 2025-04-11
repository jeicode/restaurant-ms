import { environment } from "./config/enviroment";
import { consumeOrderHistory } from "./consumer";
import { runServer } from "./server";

consumeOrderHistory();
runServer({ PORT: environment.PORT });
