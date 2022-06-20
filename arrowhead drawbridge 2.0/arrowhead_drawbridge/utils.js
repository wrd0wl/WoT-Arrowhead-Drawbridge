const checkMetadata = (data) =>{
    return data.includes('building') || data.includes('floor') || data.includes('room') ? true : false;
        
}

module.exports = checkMetadata;