const megaplan = require('megaplanjs');
const XLSX = require('json-as-xlsx');
const axios = require('axios');
const { DH_CHECK_P_NOT_SAFE_PRIME } = require('constants');
const { resolve } = require('path');
const request = require('request');
const fs = require('fs');
const downloadOptions = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json',
        'Cookie': "SID2=1614338546_ssx35jmkghpimu4rt01y9; COOKIEID2=1614338549_acp3wl7y8znyv6hlk2083; TEST_COOKIE=6038d9f22b5dc",
        'csrf-token':'1614338546_ssx35jmkghpimu4rt01y9'
   },
};

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


var client = new megaplan.Client('dental.megaplan.ru', 'D25559B9E25e365aEEe3', '2E1593f12384b968e3d3b9b52bD6d316Df603399');
let g = [];
let columns = [];
let taskList = [];
let downUrl = 'dental.megaplan.ru/attach';
let url; 

async function getUploadUrl() {
    let uploadUrl = axios.post('https://b24-t05dr8.bitrix24.ru/rest/1/wc6sue8ftb24g9jg/disk.folder.uploadfile', {
        id: 37
    }).then((result) => {console.log(result.data.result)})
    .catch((error) => {
        console.log(error);
    });

    return 
}

function taskReader(tasks) {
    
}

function getTasks(offsett) {
    client.tasks({offset:offsett, limit: '100', filterid: 511, detailed:true}).send(function (tasks) {
        if (Object.keys(tasks).length === 0) {
            XLSX( columns ,  g ,  settings ,  true);
            return;
        } else {
            g = [...g,...Object.values(tasks)];
            columns = Object.keys(g[0]).map((x) => {return {label:x, value:x}});

            for (let i = offsett; i < g.length; i++) {
                if (g[i].hasOwnProperty('all_attaches')) {
                    let fileArray = Object.values(g[i]['all_attaches']); 
                    let filePath = g[i].id; 
                    let filePathFS = "./files/"+filePath; 

                    if (!fs.existsSync(filePathFS)){
                        fs.mkdirSync(filePathFS);
                    }

                    if (fileArray[0] != undefined) {
                        for (let x = 0; x < fileArray.length; x++) {
                            const fileUrlArray = fileArray[x].url.split('/');
                            const fileUrlName = fileUrlArray[fileUrlArray.length-1].includes('%') ? decodeURI(fileUrlArray[fileUrlArray.length-1]) : fileUrlArray[fileUrlArray.length-1];
                            const fileUrl = 'http://' + downUrl + fileArray[x].url.slice(10);
                            if (fileUrlName == 'DentalFantasy_Ru.xlsx') {
                                req = request.get(fileUrl,downloadOptions);
                                req.pipe(fs.createWriteStream("./files/"+ filePath +"/"+fileUrlName));

                                const f = fs.createReadStream("./files/"+ filePath +"/"+fileUrlName, {encoding: 'base64'});
                                
                                f.on('data', function (data) {
                                    console.log(data);
                                });


                                request.post('https://b24-t05dr8.bitrix24.ru/rest/1/wc6sue8ftb24g9jg/upload/?token=disk%7CaWQ9MzcmZ2VuZXJhdGVVbmlxdWVOYW1lPTAmXz1BMVZmc01kRVNxemdVV0U5VFFSSmxhWkRUMGlpY25vYQ%3D%3D%7CInVwbG9hZHxkaXNrfGFXUTlNemNtWjJWdVpYSmhkR1ZWYm1seGRXVk9ZVzFsUFRBbVh6MUJNVlptYzAxa1JWTnhlbWRWVjBVNVZGRlNTbXhoV2tSVU1HbHBZMjV2WVE9PXwxfHdjNnN1ZThmdGIyNGc5amci.5a7zVqReGFvyDD5iEtXvPjoaYpgKAmc1xkpAEkAlLPI%3D',{
                                    file: 'PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgPGhlYWQ+CiAgICAgICAgPG1ldGEgY2hhcnNldD0iVVRGLTgiIC8+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0icmVmcmVzaCIgY29udGVudD0iMDt1cmw9J2h0dHBzOi8vZmlsZS05Lm1lZ2FwbGFuLnJ1L2Rvd25sb2FkL3BYanVnbEVad2FibVdxVnoxYmQ5NWUzMTQzODhiZjcyMGRjODBhNzE5ZWM2M2M4YTQzNDQ3MGZmL2RlbnRhbC5tZWdhcGxhbi5ydS9hdHRhY2gvMTAwMDAwNi8xMDAwMTA2LzIzMi8zOC9hNWJmZjM4YTYzZTM3Mjc4MjU4ZmE1NDZjZTlkNWYxYy54bHN4L0RlbnRhbEZhbnRhc3lfUnUueGxzeCciIC8+CgogICAgICAgIDx0aXRsZT5SZWRpcmVjdGluZyB0byBodHRwczovL2ZpbGUtOS5tZWdhcGxhbi5ydS9kb3dubG9hZC9wWGp1Z2xFWndhYm1XcVZ6MWJkOTVlMzE0Mzg4YmY3MjBkYzgwYTcxOWVjNjNjOGE0MzQ0NzBmZi9kZW50YWwubWVnYXBsYW4ucnUvYXR0YWNoLzEwMDAwMDYvMTAwMDEwNi8yMzIvMzgvYTViZmYzOGE2M2UzNzI3ODI1OGZhNTQ2Y2U5ZDVmMWMueGxzeC9EZW50YWxGYW50YXN5X1J1Lnhsc3g8L3RpdGxlPgogICAgPC9oZWFkPgogICAgPGJvZHk+CiAgICAgICAgUmVkaXJlY3RpbmcgdG8gPGEgaHJlZj0iaHR0cHM6Ly9maWxlLTkubWVnYXBsYW4ucnUvZG93bmxvYWQvcFhqdWdsRVp3YWJtV3FWejFiZDk1ZTMxNDM4OGJmNzIwZGM4MGE3MTllYzYzYzhhNDM0NDcwZmYvZGVudGFsLm1lZ2FwbGFuLnJ1L2F0dGFjaC8xMDAwMDA2LzEwMDAxMDYvMjMyLzM4L2E1YmZmMzhhNjNlMzcyNzgyNThmYTU0NmNlOWQ1ZjFjLnhsc3gvRGVudGFsRmFudGFzeV9SdS54bHN4Ij5odHRwczovL2ZpbGUtOS5tZWdhcGxhbi5ydS9kb3dubG9hZC9wWGp1Z2xFWndhYm1XcVZ6MWJkOTVlMzE0Mzg4YmY3MjBkYzgwYTcxOWVjNjNjOGE0MzQ0NzBmZi9kZW50YWwubWVnYXBsYW4ucnUvYXR0YWNoLzEwMDAwMDYvMTAwMDEwNi8yMzIvMzgvYTViZmYzOGE2M2UzNzI3ODI1OGZhNTQ2Y2U5ZDVmMWMueGxzeC9EZW50YWxGYW50YXN5X1J1Lnhsc3g8L2E+LgogICAgPC9ib2R5Pgo8L2h0bWw+'
                                });
                            }
                        }
                    }
                }
            }

            for (let i = offsett; i < g.length; i++) { 
                if (!g[i].hasOwnProperty('super_task')) {
                    taskList.push(g[i].id)
                }

                if (g[i].hasOwnProperty('super_task')) {
                    if (g[i].super_task.id in taskList) {
                        taskList.push(g[i].id)
                    }
                }
            }
            getTasks(offsett+100);
        }
    }, function (err) {
        console.log(err);
    });
}

// getTasks(0);
// getUploadUrl();

const f = fs.createReadStream("./DentalFantasy_Ru.xlsx", {encoding: 'base64'});
                                
f.on('data', function (data) {
    req = request.post('https://b24-t05dr8.bitrix24.ru/rest/1/wc6sue8ftb24g9jg/upload/?token=disk%7CaWQ9MzcmZ2VuZXJhdGVVbmlxdWVOYW1lPTAmXz1BMVZmc01kRVNxemdVV0U5VFFSSmxhWkRUMGlpY25vYQ%3D%3D%7CInVwbG9hZHxkaXNrfGFXUTlNemNtWjJWdVpYSmhkR1ZWYm1seGRXVk9ZVzFsUFRBbVh6MUJNVlptYzAxa1JWTnhlbWRWVjBVNVZGRlNTbXhoV2tSVU1HbHBZMjV2WVE9PXwxfHdjNnN1ZThmdGIyNGc5amci.5a7zVqReGFvyDD5iEtXvPjoaYpgKAmc1xkpAEkAlLPI%3D',{
        file: data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    console.log(req);
});


