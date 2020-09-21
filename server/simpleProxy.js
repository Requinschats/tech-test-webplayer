const fetch = require("node-fetch");

const DEFAULT_HEADER = {
  country: "CA",
  language: "en",
  "x-client-id": "lklfdewur8943u98",
  "Content-Type": "application/json",
};

const BASE_URI = "https://music-api-service-prod.stingray.com";

const get = async (req, res) => {
  try {
    let header = { ...DEFAULT_HEADER, ...req.header };
    let params = {
      headers: header,
      method: req.method,
    };
    if (req.method !== "GET" && req.method !== "HEAD") {
      params.body = JSON.stringify(req.body);
    }
    const response = await fetch(`${BASE_URI}${req.url}`, params);
    console.log(response)
    if (!response || response.status >= 300) {
      return res.status(response.status).json({ error: "Communication Error with Music API." });
    }
    const json = await response.json();
    res.json(json);
  } catch (e) {
    const errorMessage = `Error communicating with Music API: ${e.message}`;
    console.error(errorMessage);
    return res.status(500).json({ error: errorMessage });
  }
};

module.exports = {
  get,
};
