import { APPConfig } from "../Helper";

const image_url = "";
// const API_URL = "https://api-shield.rukkor.dev/";
// const odooHost = "http://demo.wangoes.com";
// const odooDatabase = "demo.wangoes.com";
const odooHost = "http://kg.wangoes.com";
const odooDatabase = "kg.wangoes.com";
const jsonRpcEndpoint = `${odooHost}/jsonrpc`;

const ApiEndPoints = {
  imagepath: image_url,
  odooHost: `${odooHost}`,
  odooDatabase: `${odooDatabase}`,
  jsonRpcEndpoint: `${jsonRpcEndpoint}`,
};

export default ApiEndPoints;
