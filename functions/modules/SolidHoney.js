const path = require('path');

// Module Data
const moduleData = {
    packFilesPath: "modules/SolidHoney/",
    files: [
        {
            name: "honey_block_bottom.png",
            inPackName: "honey_block_bottom.png",
        },
        {
            name: "honey_block_side.png",
            inPackName: "honey_block_side.png",
        },
        {
            name: "honey_block_top.png",
            inPackName: "honey_block_top.png",
        },
    ],
    model: {
        inPackName: "honey_block.json",
        data: `{
            "parent": "block/cube_bottom_top",
            "textures": {
                "bottom": "block/honey_block_bottom",
                "top": "block/honey_block_top",
                "side": "block/honey_block_side"
            }
        }`,
    },
    path5: {
        blockTexture: "assets/minecraft/textures/block",
        blockModel: "assets/minecraft/models/block",
    },
};

// Module function
module.exports = async function(format, archive, bucket){
    // Change data based on format
    let pathData;
    if (format === 5) {
        pathData = moduleData.path5;
    } else {
        console.log('format not addressed');
        return;
    }

    // Add model
    archive.append(moduleData.model.data, {name: path.join(pathData.blockModel, moduleData.model.inPackName)});

    // Add files
    const promises = formatData.files.map(async (fileData, id) => {
        await bucket.file(path.join("packfiles", moduleData.packFilesPath, fileData.name)).download().then((data) => {
            return archive.append(data[0], {name: path.join(pathData.blockTexture, fileData.inPackName)});
        });
    });
    await Promise.all(promises);
}