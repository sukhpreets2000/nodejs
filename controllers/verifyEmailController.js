import Users from "../models/userModel.js"

const verifyEmailController = async (req, res) => {
    try {
        const { token } = req.params

        const user = await Users.findOne({ emailVerificationToken: token })

        if (!user) {
            return res.status(404).json({ message: "Invalid verification token." })
        }

        user.emailVerified = true;
        user.emailVerificationToken = undefined;

        await user.save();
        res.status(200).json({ message: "Email verified successfully." })
    }
    catch (err) {
        res.status(500).json({ message: "Error verifying email.", err });
    }
}
export { verifyEmailController }