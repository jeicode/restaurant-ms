import { runServer } from "./server";
import { environment } from "./config/enviroment";

runServer({ PORT: environment.PORT });