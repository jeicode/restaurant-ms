import { runServer } from "./server";
import { environment } from "./config/enviroment";

const escapedPass = encodeURIComponent("tW-F5c3UW#vEQLS"); // "p%40ssw%3Aord"

console.log("escapedPass ", escapedPass);
runServer({ PORT: environment.PORT });
