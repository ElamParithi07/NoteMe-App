const { google } = require('googleapis')
const ExcelModel = require('../Models/ExcelModel')
const UserModel = require('../Models/UserModel')
require('dotenv').config()

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.FILE_ACCESS,    
    scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
});

async function writeToSheet(values) {

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1OV8BG1LHcIVqihLS8HixcxdurCLmLhOJQEPGhULGmmk';
    const range = 'Sheet1!A2';
    const valueInputOption = 'USER_ENTERED';

    const resource = { values }
    try {
        console.log('inside update')
        const res = sheets.spreadsheets.values.update({
            spreadsheetId, range, valueInputOption, resource
        })
        return res;
    } catch (err) {
        console.log(err)
    }
}

async function updateSheet(data, reference, sheetId) {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = sheetId;
    const range = 'Sheet1!A1:Z'; 
    const valueInputOption = 'USER_ENTERED';

    try {
        console.log('inside update');
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const values = response.data.values;
        console.log(values)
        if (values.length) {
            const rowIndex = values.findIndex(row => row[0] === reference); 
            console.log("This is rowIndex", rowIndex)
            if (rowIndex !== -1) {
                const headers = values[0]; 
                const newData = [...values[rowIndex]]; 

                for (let i = 0; i < headers.length; i++) {
                    if (headers[i] in data) {
                        newData[i] = data[headers[i]];
                    }
                }
                console.log("New Data: ", newData);

                await sheets.spreadsheets.values.update({
                    spreadsheetId,
                    range: `Sheet1!A${rowIndex + 1}`,
                    valueInputOption,
                    resource: { values: [newData] }
                });
                console.log(`Row updated for reference ${reference}`);
            } else {
                console.log(`No row found with reference ${reference}`);
                return "No data"
            }
        } else {
            console.log('No data found in the spreadsheet');
            return "Excel is empty"
        }
    } catch (err) {
        console.log(err);
    }
}

function getSpreadsheetIdFromUrl(url) {
    try {
        const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        if (match && match[1]) {
            return match[1];
        } else {
            throw new Error('Invalid Google Spreadsheet URL');
        }
    } catch (error) {
        console.error('Error extracting spreadsheet ID:', error);
        throw error;
    }
}

// async function createSpreadsheet(spreadsheetName, columnLabels) {
//     try {
//         const sheets = google.sheets({ version: 'v4', auth });

//         const columnFormat = [];
//         const providedColumnIndexes = [];
//         for (let i = 0; i < columnLabels.length; i++) {
//             const label = columnLabels[i];
//             columnFormat.push({
//                 userEnteredFormat: {
//                     backgroundColor: { red: 0, green: 0, blue: 0 }, // Black background
//                     textFormat: { foregroundColor: { red: 1, green: 1, blue: 1 } } // White text
//                 }
//             });
//             providedColumnIndexes.push(i);
//         }

//         // Define the title and properties of the new spreadsheet
//         const resource = {
//             properties: {
//                 title: spreadsheetName // Set the title of the new spreadsheet
//             },
//             sheets: [{
//                 properties: {
//                     title: 'Sheet1', // Set the title of the sheet
//                     gridProperties: {
//                         frozenRowCount: 1 // Freeze the first row for headers
//                     }
//                 },
//                 data: [{
//                     startRow: 0,
//                     startColumn: 0,
//                     rowData: {
//                         values: columnLabels.map(label => ({ userEnteredValue: { stringValue: label } }))
//                     }
//                 }]
//             }],
//             spreadsheetId: null,
//             spreadsheetUrl: null
//         };

//         // Add formatting to columns for provided column labels
//         if (columnFormat.length > 0) {
//             resource.sheets[0].data[0].rowData.values.forEach((value, index) => {
//                 if (providedColumnIndexes.includes(index)) {
//                     value.userEnteredFormat = columnFormat[providedColumnIndexes.indexOf(index)].userEnteredFormat;
//                 }
//             });
//         }

//         // Create the new spreadsheet
//         const response = await sheets.spreadsheets.create({ resource });

//         const spreadsheetId = response.data.spreadsheetId;
//         const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;

//         // Set sharing settings to allow anyone with the link to edit the spreadsheet
//         await setSheetPermissions(spreadsheetId);

//         return spreadsheetUrl;
//     } catch (error) {
//         console.error('Error creating spreadsheet:', error);
//         throw error;
//     }
// }

async function setSheetPermissions(spreadsheetId) {
    try {
        const drive = google.drive({ version: 'v3', auth });

        const permission = {
            type: 'anyone',
            role: 'writer' // Set the role to 'writer' to allow editing
        };

        await drive.permissions.create({
            resource: permission,
            fileId: spreadsheetId,
            fields: 'id'
        });

        console.log('Sheet access enabled for everyone with the link to edit.');
    } catch (error) {
        console.error('Error setting sheet permissions:', error);
        throw error;
    }
}

// const newData = { DriveLink: 'http://test.com' };
// const writer = await writeToSheet([['Mahesh',8.99,'http//drivelink.com',1234567890]])
// await updateSheet(newData, 'Mahesh');
// console.log("Excel updated!")

async function updateExcel(req,res){
    const {Reference, data, spreadsheetUrl} = req.body;
    console.log(Reference, data,spreadsheetUrl)
    try{
        const spreadsheetId = getSpreadsheetIdFromUrl(spreadsheetUrl)
        const response = await updateSheet(data, Reference, spreadsheetId);
        if(response==="No data") return res.status(404).json({message:`${Reference} not found in sheet`})
        else if(response==="Excel is empty") return res.status(404).json({message:"Sheet is empty"})
        return res.status(200).json({message:"Sheet updated successfully!"});
    }
    catch(err){
        console.log(err)
        return res.json({status:400,message:"Error in upating the sheet"})
    }
}

async function createExcel(req, res) {
    const { name, labels, namelist } = req.body;
    const userid = req.locals.userid;
    const email = req.locals.email;
    const sheets = google.sheets({ version: 'v4', auth })
    try {
        const spreadsheetURL = await createSpreadsheet(name, labels, namelist);
        if (spreadsheetURL === "" || !spreadsheetURL) throw "Unable to create spreadsheet"
        if (namelist.length === 0) {
            const data = new ExcelModel({ createdBy: userid, name: name, sheetURL: spreadsheetURL, labels: labels });
            await data.save();
            Updateduser = await UserModel.findOneAndUpdate(
                { email: email }, // Query to find the user by email
                { $push: { mysheets: data._id } }, // Append the new sheet's ID to the mysheets array
                { new: true } // To return the updated document
            );
            return res.status(200).json({ message: "Sheet created Successfully!", sheetUrl: spreadsheetURL })
        }
        const spreadsheetId = getSpreadsheetIdFromUrl(spreadsheetURL)
        const range = `Sheet1!B2:B${namelist.length + 1}`;

        const requestBody = {
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: namelist.map(name => [name]),
            },
        };

        const response = await sheets.spreadsheets.values.update(requestBody);
        const data = new ExcelModel({ createdBy: userid, name: name, sheetURL: spreadsheetURL, labels: labels });
        await data.save();
        Updateduser = await UserModel.findOneAndUpdate(
            { email: email }, // Query to find the user by email
            { $push: { mysheets: data._id } }, // Append the new sheet's ID to the mysheets array
            { new: true } // To return the updated document
        );

        res.status(200).json({ message: "Sheet created Successfully!", sheetUrl: spreadsheetURL })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: "Error in creating the sheet", error: err })
    }
}

async function getExcel(req, res){
    const userid= req.locals.userid;
    try{
        const data = await ExcelModel.find({createdBy:userid});
        if(data){
            return res.status(200).json({data:data})
        }
        else{
            return res.status(401).json({message:"No sheets found"})
        }
    }
    catch(err){
        console.log(err)
        return res.json(400).json({message:err})
    }
}


async function createSpreadsheet(spreadsheetName, columnLabels, namelist) {
    try {
        const sheets = google.sheets({ version: 'v4', auth });

        // Define the title and properties of the new spreadsheet
        const resource = {
            properties: {
                title: spreadsheetName // Set the title of the new spreadsheet
            },
            sheets: [{
                properties: {
                    title: 'Sheet1', 
                },
                data: [{
                    startRow: 0,
                    startColumn: 0,
                    rowData: {
                        values: [{ 
                            userEnteredValue: { stringValue: 'SNO' }, 
                            userEnteredFormat: {
                                backgroundColor: { red: 0, green: 0, blue: 0 }, // Black background
                                textFormat: { foregroundColor: { red: 1, green: 1, blue: 1 } } // White text
                            }
                        }, 
                        ...columnLabels.map((label, index) => ({
                            userEnteredValue: { stringValue: label },
                            userEnteredFormat: {
                                backgroundColor: { red: 0, green: 0, blue: 0 }, // Black background
                                textFormat: { foregroundColor: { red: 1, green: 1, blue: 1 } } // White text
                            }
                        }))
                        ]
                    }
                }]
            }],
            spreadsheetId: null,
            spreadsheetUrl: null
        };

        // Create the new spreadsheet
        const response = await sheets.spreadsheets.create({ resource });

        const spreadsheetId = response.data.spreadsheetId;
        const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;

        // Set sharing settings to allow anyone with the link to edit the spreadsheet
        await setSheetPermissions(spreadsheetId);

        // Add numeric values to the "SNO" column
        const snoValues = Array.from({ length: namelist.length }, (_, i) => [i + 1]); // Generate numeric values starting from 1
        snoValues.unshift(['SNO']); // Add "SNO" label to the beginning
        const snoColumn = {
            spreadsheetId,
            range: `Sheet1!A1:A${snoValues.length + 1}`, // Start from the first row
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: snoValues
            }
        };
        await sheets.spreadsheets.values.update(snoColumn);

        return spreadsheetUrl;
    } catch (error) {
        console.error('Error creating spreadsheet:', error);
        throw error;
    }
}



module.exports = {updateExcel,createExcel,getExcel}