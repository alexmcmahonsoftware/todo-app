const TodoList = require('../models/todolist');

const catchAsyncErrors = require('../middlewares/catch_async_errors');

exports.getTodoList = catchAsyncErrors(async (req, res, next) => {
    // result = await TodoList.find({ user: req.user._id });
    const itemCount = await TodoList.find({ user: req.user._id }).countDocuments();
    const result = await TodoList.find({ user: req.user._id }).skip(req.query.curPage * req.query.resPerPage).limit(req.query.resPerPage);
    console.log(req.query);
    res.status(200).json({
        success: true,
        result,
        itemCount
    });
});

exports.postTodoList = catchAsyncErrors(async (req, res, next) => {
    result = await TodoList.create({
        done: req.body.done,
        title: req.body.title,
        note: req.body.note,
        user: req.user._id
    });
    res.status(200).json({
        success: true,
        result
    });
});

exports.putTodoList = catchAsyncErrors(async (req, res, next) => {
    result = await TodoList.updateOne({
        _id: req.body._id, user: req.user._id
    }, {
        done: req.body.done,
        title: req.body.title,
        note: req.body.note
    });
    res.status(200).json({
        success: true,
        result
    });
});

exports.deleteTodoList = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    result = await TodoList.deleteOne({ _id: req.body._id, user: req.user._id });
    res.status(200).json({
        success: true,
        result
    });
});