const fs = require("fs");
const path = require('path');
const { json } = require("stream/consumers");
const  filePath=path.join(__dirname,'../models/db.json');

function readData(){
    try{
        const raw = fs.readFileSync(filePath,utf-8);
        return json.parse(raw);
    }catch(err){
        console.error("failed to read json:",err);
        return[];
    }
     function writeData(data){
        fs.writeFileSync(filePath,json.stringify(data,null,2));
        
     }const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../models/db.json");

// READ DATA
function readData() {
    try {
        const raw = fs.readFileSync(filePath, "utf-8");   // FIXED
        return JSON.parse(raw);                            // FIXED
    } catch (err) {
        console.error("Failed to read JSON:", err);
        return [];
    }
}

// WRITE DATA
function writeData(data) {                                 // FIXED: OUTSIDE readData
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));   // FIXED
    } catch (err) {
        console.error("Failed to write JSON:", err);
    }
}

module.exports = { readData, writeData };

    }
