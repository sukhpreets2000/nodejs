import Users from "../models/userModel.js";
const userProfileController = async (req, res) => {
    try {
        const { firstname, lastname, email, mobilenumber, age, gender } = req.body;

        const useremail = req.user

        const user = await Users.findOne({ email: useremail.email })

        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        if (user.email !== email) {
            return res.status(404).json({ error: "Not a valid user" })
        }

        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (mobilenumber) user.mobilenumber = mobilenumber;
        if (age) user.age = age;
        if (gender) user.gender = gender;

        await user.save();

        return res.status(200).json({ message: "profile update", data: user })
    }
    catch (err) {
        res.status(500).json({ error: "internal server error" })
    }
}
export { userProfileController }