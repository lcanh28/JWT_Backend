import loginService from '../service/loginService';

const handleRegister = async (req, res) => {
    try {
        //req.body: email, phone, username, password
        if (!req.body.username || !req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters',
                EC: '1',
                DT: '',
            });
        }
        if (req.body.password && req.body.password.length < 3) {
            return res.status(200).json({
                EM: 'Your password must have more than 2 letters',
                EC: '1',
                DT: '',
            });
        }

        //service: create user
        let data = await loginService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '',
        });
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //data
        });
    }
};

module.exports = {
    handleRegister,
};
