
const image_url = "";
const odooHost = "http://192.168.1.3:8016/";
const odooDatabase = "odoo16";
const jsonRpcEndpoint = `${odooHost}/jsonrpc`;

const ApiEndPoints = {
  imagepath: image_url,
  odooHost: `${odooHost}`,
  odooDatabase: `${odooDatabase}`,
  jsonRpcEndpoint: `${jsonRpcEndpoint}`,
};

export default ApiEndPoints;
