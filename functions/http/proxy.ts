interface Body {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: BodyInit;
}

const headers = { "Content-Type": "application/json" };

export default async function helloWorld(request) {
  const { body } = request;

  if (!body) {
    return {
      body: JSON.stringify({"error": "Missing request body"}),
      headers,
      statusCode: 200
    }
  }

  const parsedBody: Body = JSON.parse(body);

  if (!parsedBody.url || !parsedBody.method) {
    return {
      body: JSON.stringify({"error": "Missing url or method"}),
      headers,
      statusCode: 200
    }
  }

  return fetch(parsedBody.url, {
    headers,
    method: parsedBody.method,
    body: JSON.stringify(parsedBody.body),
  })
    .then(async (resp) => ({
      body: JSON.stringify(await resp.json()),
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }))
}
