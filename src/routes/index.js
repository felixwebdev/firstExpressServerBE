import userRouter from './user.js';

export default function router(app) {
    app.use('/user', userRouter);
}
