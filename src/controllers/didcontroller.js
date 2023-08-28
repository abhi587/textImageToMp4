const { default: axios } = require('axios');
const { json } = require('body-parser');
const express = require('express');


const fs = require('fs');
const path = require('path');


const textToSpeech= async function (req,res) {
  try {
    const { message, voice } = req.body;

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
      {
        text: message,
        voice_settings: {
          stability: 0,
          similarity_boost: 0,
        },
      },
      {
        headers: {
          accept: 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': "33bda07d36cc700a4a234fa3c3ed8923",
        },
        responseType: 'arraybuffer',
      }
    );

    const arrayBuffer = response.data;
    const buffer = Buffer.from(arrayBuffer);
    const file = Math.random().toString(36).substring(7);

    fs.writeFileSync(path.join('public', 'audio', `${file}.mp3`), buffer);

    res.status(200).send({ file: `${file}.mp3` });
  } catch (error) {
    res.status(500).send( { error: error.message });
  }
}




let textToMp4 = async function (req, res) {
  try {
    const requestBody = req.body;

    const { image, text } = requestBody;


    const apiKey = 'aW9uaW5rc29mZmljaWFsQGdtYWlsLmNvbQ:PVzDGVj4nWzOiIfDj5bBL';
    const apiUrl = 'https://api.d-id.com/talks';

    const headers = {
      'Authorization': `Basic ${apiKey}`,
      'Content-Type': 'application/json',
    };

    const inputData = {
      "source_url": image,
      "script": {
        "type": "text",
        "input": text
      }
    }

    let result = await axios.post(apiUrl, inputData, { headers });
    // console.log(result.data.id)

    res.status(200).send({ status: true, msg: result.data.id });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
}



const getMp4 = async function (req, res) {
  try {
    let key = req.params["key"];
    // console.log(key);

    const apiKey = 'aW9uaW5rc29mZmljaWFsQGdtYWlsLmNvbQ:PVzDGVj4nWzOiIfDj5bBL';
    const apiUrl = `https://api.d-id.com/talks/${key}`;

    const headers = {
      'Authorization': `Basic ${apiKey}`,
      'Content-Type': 'application/json',
    };

    let finalDataResponse = await axios.get(apiUrl, { headers });
    const finalData = finalDataResponse.data;

    const responseData = {
      status: true,
      data: finalData,
    };

    res.status(200).json(responseData.data.result_url);

  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};








module.exports.textToMp4 = textToMp4
module.exports.getMp4 = getMp4
module.exports.textToSpeech = textToSpeech