import User, { IUser } from '../models/User';
import catchAsyncError from '../utils/catchAsync';
import createError from 'http-errors';

async function findUser(id: string): Promise<IUser>{
    const user: IUser | null = await User.findOne({ _id: id });
    if (!user) throw createError(404, 'User not found');
    return user;
}

const getUsers = catchAsyncError(async function (req, res) {
    const users: IUser[] = await User.find();
    res.status(200).json({ users: users });
});

const getUser = catchAsyncError(async function (req, res) {
    const user = await findUser(req.params.id);
    res.status(200).json({ user: user });
});

const createUser = catchAsyncError(async function (req, res) {
    if (!req.body.username || !req.body.password || !req.body.email)
        throw createError(400, 'Missing required fields');

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    await user.save();
    res.status(200).json({ message: 'User has been created successfully' });
});

const updateUser = catchAsyncError(async function (req, res) {
    const user = await findUser(req.params.id);
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    await user.save();
    res.status(200).json({ message: 'User has been updated successfully' });
});

const deleteUser = catchAsyncError(async function (req, res) {
    const user = await findUser(req.params.id);
    await user.deleteOne();
    res.status(200).json({ message: 'User has been deleted successfully' });
});

export default { getUsers, getUser, createUser, updateUser, deleteUser };
