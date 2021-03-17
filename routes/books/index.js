const express = require('express');
const router = express.Router();

const Book = require('../../models/Book');
const validations = require('./validations');

router.post('/', async (req, res, next) => {
  try {
    // await validations.validateAsync(req.body);

    const book = new Book(req.body);
    await book.save();
    res.json(req.body);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    // const books = await Book.findOne({
    //   name: { $regex: /tarih/i },
    // });

    const books = await Book.find({});

    res.json(books);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const books = await Book.findById(id);

    res.json(books);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    // const response = await Book.updateMany(
    //   {
    //     year: {
    //       $lt: 2020,
    //     },
    //   },
    //   {
    //     year: 2021,
    //   },
    // );

    // res.json(response);

    const updatedData = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedData);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    // const response = await Book.deleteMany({
    //   year: {
    //     $lt: 2020,
    //   },
    // });

    // res.json(response);

    const book = await Book.findByIdAndDelete(id);

    res.json(book);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
