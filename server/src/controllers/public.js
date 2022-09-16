import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

const Category = mongoose.model('Category');
const Post = mongoose.model('Post');
const Company = mongoose.model('Company');
const Field = mongoose.model('Field');
const Skill = mongoose.model('Skill');
const Recruitment = mongoose.model('Recruitment');

exports.categories = function (req, res) {
  Category.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};

exports.companies = function (req, res) {
  Skill.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};

exports.detailCompanies = async function (req, res) {

  Company.find({}).exec(async function (err, docs) {
    const results = []
    for (let index = 0; index < docs.length; index++) {
      const doc = docs[index];

      const count = await Recruitment.find({
        "company": new mongoose.Types.ObjectId(doc._id)
      }).count().exec()

      results.push(Object.assign({}, doc.toObject(), { 'recruitmentCount': count }))
    }

    if (err) return response.sendNotFound(res);
    res.json(results);
  })

};

exports.skills = function (req, res) {
  Skill.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};

exports.detailSkills = function (req, res) {
  Skill.find({}).exec(async function (err, docs) {
    const results = []
    for (let index = 0; index < docs.length; index++) {
      const doc = docs[index];

      const count = await Recruitment.find({
        $expr: {
          $in: [new mongoose.Types.ObjectId(doc._id), "$skills"]
        }
      }).count().exec()

      results.push(Object.assign({}, doc.toObject(), { 'recruitmentCount': count }))
    }

    if (err) return response.sendNotFound(res);
    res.json(results);
  })
};

exports.fields = function (req, res) {
  Field.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};

exports.detailFields = function (req, res) {
  Field.find({}).exec(async function (err, docs) {
    const results = []
    for (let index = 0; index < docs.length; index++) {
      const doc = docs[index];

      const count = await Recruitment.find({
        $expr: {
          $in: [new mongoose.Types.ObjectId(doc._id), "$fields"]
        }
      }).count().exec()

      results.push(Object.assign({}, doc.toObject(), { 'recruitmentCount': count }))
    }

    if (err) return response.sendNotFound(res);
    res.json(results);
  })
};

exports.posts = function (req, res) {
  Post.find({}).populate("category").populate({
    path: "comments", populate: {
      path: "owner",
      populate: {
        path: "profile"
      }
    }
  }).populate({
    path: "owner",
    populate: {
      path: "profile"
    }
  }).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};

exports.post = function (req, res) {
  Post.findById(req.params.id).populate("category")
    .populate({
      path: "comments", populate: {
        path: "owner",
        populate: {
          path: "profile"
        }
      }
    })
    .populate({
      path: "answers", populate: {
        path: "owner",
        populate: {
          path: "profile"
        }
      }
    })
    .populate({
      path: "owner",
      populate: {
        path: "profile"
      }
    }).exec(function (err, docs) {
      if (err) return response.sendNotFound(res);
      res.json(docs);
    })
};

exports.recruitments = async function (req, res) {
  let query = {};

  const queryRefs = [{ name: "company", model: "Company" }, { name: "skills", model: "Skill" }, { name: "fields", model: "Field" }];
  for (const ref of queryRefs) {
    if (ref["name"] in req.query) {
      query = await Recruitment.findByRef(ref['model'], ref['name'], query, req.query[ref['name']])
    }
  }

  Recruitment.find(query)
    .populate({
      path: "owner",
      populate: {
        path: "profile"
      }
    })
    .exec(function (err, docs) {
      if (err) return response.sendNotFound(res);
      res.json(docs);
    })
};