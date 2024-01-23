const taikhoanModel = require("../model/taikhoangd.m");

module.exports = {
    insertTaiKhoan: async (req, res) => {
        //const user = await userM.getByEmail("haonhat2729@gmail.com")
        const username = req.body.username;
        const isActive = req.body.isActive;
        let data = await taikhoanModel.getTaiKhoanByUsername(username);
        // console.log(data);
        if (data) {
            return res.status(400).json({ msg: "Username is existed" });
        }

        let account = new taikhoanModel(username, 0, isActive);
        let data1 = await taikhoanModel.insertTaiKhoan(account);
        return res.status(200).json({ msg: "Insert successully" });
    },

    updateTaiKhoan: async (req, res) => {
        const username = req.body.username;
        const isActive = req.body.isActive;
        let account = await taikhoanModel.getTaiKhoanByUsername(username);
        //console.log(account);
        if (!account) {
            return res.status(400).json({ msg: "Username is NOT existed" });
        }
        account.active = isActive;
        try {
            await taikhoanModel.updateTaiKhoanByUsername(account);
            return res.status(200).json({ msg: "update successfully" })
        } catch (error) {
            return res.status(400).json({ msg: error });
        }
    },

    deleteTaiKhoan: async (req, res) => {
        try {
            const username = req.body.username;
            await taikhoanModel.deleteTaiKhoanByUsername(username);
            return res.status(200).json({ msg: "delete sucessfully" })
        } catch (error) {
            return res.status(400).json({ msg: "delete fail" });
        }

    }
};
