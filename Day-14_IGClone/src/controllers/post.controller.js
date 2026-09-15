const postModel = require("../model/post.model")
const { toFile } = require("@imagekit/nodejs");
const ImageKit = require("@imagekit/nodejs");


const imageKit = new ImageKit({
  privateKey: "private_o+L2VfNPbE0MbAxk4CdVo8SQzC4="
});

async function createPostController (req,res){
    console.log(req.body , req.file)

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test"
    })

    res.send(file);
}  

module.exports = {createPostController,}