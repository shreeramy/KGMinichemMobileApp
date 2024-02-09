import { APPConfig } from "../Helper";

const image_url = "";
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
