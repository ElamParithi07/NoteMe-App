const NotesModel = require('../Models/NotesModel')
const redis = require('redis')

const redisClient = redis.createClient(6379);
const DEFAULT_EXPIRATION = 3600;
(async () => {  
    await redisClient.connect();
})();


redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('error', (error) => {
    console.error('Redis client error:', error);
});

async function create(req, res) {
    let { title, content, type } = req.body;
    const userid = req.locals.userid;
    try {
        const data = new NotesModel({ createdBy: userid, title, content, type });
        await data.save();
        if (data) {
            return res.status(200).json({ status: true, data: data, message: "Notes Added!" });
        }
        else {
            return res.status(400).json({ message: 'Data not added' });
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
}

async function update(req, res) {
    let { _id, title, content, type } = req.body;
    try {
        const data = await NotesModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    title: title,
                    content: content,
                    type: type
                }
            },
            {
                new: true,
                upsert: true
            }
        );
        if (data) {
            const value = await redisClient.get("note1");
            console.log(value)

            return res.status(200).json({ status: true, data: data, message: "Notes updated" });
        } else {
            return res.status(401).json({ status: false, message: "Notes not updated" });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).json(e);
    }
}

async function getNotes(req, res) {
    const userId = req.locals.userid;

    try {
        // Attempt to retrieve notes from Redis cache
        const value = await redisClient.get("notes",(err,reply)=>{
            if(err) console.log(err)
            if(reply){
                console.log("Cache Hit");
                return res.status(200).json({ status: true, data: JSON.parse(reply) });
            }
        });
        if (value !== null) {
            console.log("Cache found");
            return res.status(200).json({ status: true, data: JSON.parse(value) });
        } else {
            console.log("Cache added");
            // Fetch notes from database
            const data = await NotesModel.find({ createdBy: userId });

            if (data && data.length > 0) {
                // Store fetched notes in Redis cache
                redisClient.setEx("notes", DEFAULT_EXPIRATION, JSON.stringify(data), (error) => {
                    if (error) {
                        console.log("Error setting notes in Redis:", error);
                    }
                })

                // Send response with fetched notes
                return res.status(200).json({ status: true, data: data });
            } else {
                return res.status(404).json({ status: false, message: "No notes found" });
            }
        }

    } catch (err) {
        console.log("Error in getNotes:", err);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}


async function deletNotes(req, res) {
    const { _id } = req.body;
    try {
        const result = await NotesModel.findByIdAndDelete(_id);
        if (!result) {
            return res.status(404).json("Notes not found")
        }
        else {
            return res.status(200).json({ status: true, message: "Notes Deleted!" })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, message: "Internal server error" })
    }
}

module.exports = { create, update, getNotes, deletNotes };
