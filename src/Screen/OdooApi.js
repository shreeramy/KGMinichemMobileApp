// const odooHost = "http://kg.wangoes.com";
// const odooDatabase = "kg.wangoes.com";
const odooHost = "http://kg.wangoes.com";
const odooDatabase = "kg.wangoes.com";
const jsonRpcEndpoint = `${odooHost}/jsonrpc`;

const ApiEndPoints = {
  odooHost: `${odooHost}`,
  odooDatabase: `${odooDatabase}`,
  jsonRpcEndpoint: `${jsonRpcEndpoint}`,
};
// Define the authenticate function
export async function authenticate(username, password) {
  try {
    const response = await fetch(ApiEndPoints.jsonRpcEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "common",
          method: "authenticate",
          args: [ApiEndPoints.odooDatabase, username, password, {}],
        },
      }),
    });

    const data = await response.json();
    if (data.error) {
      console.error("Authentication error:", data.error);
      return null;
    }
    return data.result;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

// odooApi.js
export async function searchRead(
  uid,
  model,
  searchCriteria,
  limit,
  offset,
  fields
) {
  try {
    const response = await fetch(ApiEndPoints.jsonRpcEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "object",
          method: "execute_kw",
          args: [
            ApiEndPoints.odooDatabase,
            uid,
            "admin",
            model,
            "search_read",
            [searchCriteria],
            {
              limit: limit,
              offset: offset,
              fields: fields,
            },
          ],
        },
      }),
    });

    const responseData = await response.json();

    if (responseData.result) {
      return responseData.result;
    } else {
      console.error("searchRead error:", responseData.error);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function get_all_product_details(uid, searchCriteria) {
  try {
    const response = await fetch(ApiEndPoints.jsonRpcEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "object",
          method: "execute_kw",
          args: [
            ApiEndPoints.odooDatabase,
            uid,
            "admin",
            "product.template",
            "get_all_product_details",
            [searchCriteria],
            {},
          ],
        },
      }),
    });

    const responseData = await response.json();

    if (responseData.result) {
      return responseData.result;
    } else {
      console.error("get_all_product_details error:", responseData.error);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// odooApi.js
export async function callOdooMethod(
  uid,
  model,
  methodName,
  methodArgs = [],
  kwargs = {}
) {
  try {
    const response = await fetch(ApiEndPoints.jsonRpcEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "object",
          method: "execute_kw",
          args: [
            ApiEndPoints.odooDatabase,
            uid,
            "admin",
            model,
            methodName,
            methodArgs,
            kwargs,
          ],
        },
      }),
    });

    const responseData = await response?.json();

    console.log("Response Data:??.//", responseData); // Log the entire response for debugging

    if (responseData?.result !== undefined) {
      return responseData?.result;
    } else {
      console.error(`${methodName} error:`, responseData?.error);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
