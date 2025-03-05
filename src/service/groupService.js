import db from '../models/index';

const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']]
        });
        if(data) {
            return {
                EM: 'Success',
                EC: 0,
                DT: data
            }
        } else {
            return {
                EM: 'No Groups',
                EC: 0,
                DT: []
            }
        }
    } catch(e) {
        console.log(e);
        return {
            EM: 'Something wrongs in services....',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getGroups
}