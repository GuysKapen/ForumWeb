import mongoose from "mongoose";
import response from "../helpers/response";
import request from "../helpers/request";
import pagination from "../helpers/pagination";

const Category = mongoose.model("Category");
const Post = mongoose.model("Post");
const Company = mongoose.model("Company");
const Field = mongoose.model("Field");
const Skill = mongoose.model("Skill");
const Recruitment = mongoose.model("Recruitment");

exports.categories = function (req, res) {
  Category.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  });
};

exports.detailCategories = async function (req, res) {
  let results = await Post.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $project: { category: "$_id", count: 1, _id: 0 } },
  ]).exec();

  Category.populate(results, { path: "category" }, function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  });
};

exports.companies = function (req, res) {
  Company.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  });
};

exports.detailCompanies = async function (req, res) {
  let results = await Recruitment.aggregate([
    { $group: { _id: "$company", count: { $sum: 1 } } },
    { $project: { company: "$_id", count: 1, _id: 0 } },
  ]).exec();

  Company.populate(results, { path: "company" }, function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  });
};

exports.skills = function (req, res) {
  Skill.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  });
};

exports.detailSkills = async function (req, res) {
  let results = (
    await Recruitment.aggregate([
      { $unwind: "$skills" },
      { $group: { _id: "$skills", count: { $sum: 1 } } },
      {
        $group: {
          _id: null,
          skill_details: {
            $push: {
              skill: "$_id",
              count: "$count",
            },
          },
        },
      },
      { $project: { _id: 0, skill_details: 1 } },
    ]).exec()
  )[0]["skill_details"];

  Skill.populate(results, { path: "skill" }, function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  });
};

exports.fields = function (req, res) {
  Field.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  });
};

exports.detailFields = async function (req, res) {
  let results = (
    await Recruitment.aggregate([
      { $unwind: "$fields" },
      { $group: { _id: "$fields", count: { $sum: 1 } } },
      {
        $group: {
          _id: null,
          field_details: {
            $push: {
              field: "$_id",
              count: "$count",
            },
          },
        },
      },
      { $project: { _id: 0, field_details: 1 } },
    ]).exec()
  )[0]["field_details"];

  Field.populate(results, { path: "field" }, function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  });
};

exports.posts = async function (req, res) {
  let query = {};
  const page = req.query["page"] || 1;
  console.log("page", page);
  const limit = req.query["limit"] || 5;

  const queryRefs = [{ name: "category", model: "Category" }];
  for (const ref of queryRefs) {
    if (ref["name"] in req.query) {
      query = await Recruitment.findByRef(
        ref["model"],
        ref["name"],
        query,
        req.query[ref["name"]]
      );
    }
  }

  Post.paginate(
    query,
    {
      limit: limit,
      page: page,
      populate: [
        { path: "category" },
        {
          path: "comments",
          populate: {
            path: "owner",
            populate: {
              path: "profile",
            },
          },
        },
        {
          path: "owner",
          populate: {
            path: "profile",
          },
        },
      ],
    },
    function (err, docs) {
      if (err) return response.sendNotFound(res);
      res.json(docs);
    }
  );
};

exports.topPosts = async function (req, res) {
  let query = {};

  Post.find(query)
    .populate({
      path: "owner",
      populate: {
        path: "profile",
      },
    })
    .sort({ _id: "asc" })
    .limit(6)
    .exec(function (err, docs) {
      if (err) return response.sendNotFound(res);
      res.json(docs);
    });
};

exports.post = function (req, res) {
  Post.findById(req.params.id)
    .populate("category")
    .populate({
      path: "comments",
      populate: {
        path: "owner",
        populate: {
          path: "profile",
        },
      },
    })
    .populate({
      path: "answers",
      populate: {
        path: "owner",
        populate: {
          path: "profile",
        },
      },
    })
    .populate({
      path: "owner",
      populate: {
        path: "profile",
      },
    })
    .exec(function (err, docs) {
      if (err) return response.sendNotFound(res);
      res.json(docs);
    });
};

exports.recruitments = async function (req, res) {
  let query = {};

  const page = req.query["page"] || 1;
  const limit = req.query["limit"] || 5;

  const queryRefs = [
    { name: "company", model: "Company" },
    { name: "skills", model: "Skill" },
    { name: "fields", model: "Field" },
  ];
  for (const ref of queryRefs) {
    if (ref["name"] in req.query) {
      query = await Recruitment.findByRef(
        ref["model"],
        ref["name"],
        query,
        req.query[ref["name"]]
      );
    }
  }

  Recruitment.paginate(
    query,
    {
      limit: limit,
      page: page,
      populate: [
        {
          path: "owner",
          populate: {
            path: "profile",
          },
        },
      ],
    },
    function (err, docs) {
      if (err) return response.sendNotFound(res);
      res.json(docs);
    }
  );
};

exports.topRecruitments = async function (req, res) {
  let query = {};

  Recruitment.find(query)
    .populate({
      path: "owner",
      populate: {
        path: "profile",
      },
    })
    .sort({ _id: "asc" })
    .limit(6)
    .exec(function (err, docs) {
      if (err) return response.sendNotFound(res);
      res.json(docs);
    });
};

exports.recruitment = function (req, res) {
  Recruitment.findById(req.params.id)
    .populate("company")
    .populate({
      path: "owner",
      populate: {
        path: "profile",
      },
    })
    .populate({
      path: "applies",
      populate: {
        path: "owner",
      },
    })
    .exec(function (err, docs) {
      if (err) return response.sendNotFound(res);
      res.json(docs);
    });
};

exports.searchRecruitments = async function (req, res) {
  let query = {};

  const queryRefs = [
    { name: "company", model: "Company" },
    { name: "skills", model: "Skill" },
    { name: "fields", model: "Field" },
  ];
  for (const ref of queryRefs) {
    if (ref["name"] in req.query) {
      query = await Recruitment.findByRef(
        ref["model"],
        ref["name"],
        query,
        req.query[ref["name"]]
      );
    }
  }

  if (req.query["name"]) {
    query["name"] = { $regex: req.query["name"], $options: "i" };
  }

  Recruitment.find(query)
    .populate({
      path: "owner",
      populate: {
        path: "profile",
      },
    })
    .exec(function (err, docs) {
      if (err) return response.sendNotFound(res);
      res.json(docs);
    });
};

exports.searchPosts = async function (req, res) {
  let query = {};
  const page = req.query["page"] || 1;
  const limit = req.query["limit"] || 5;

  const queryRefs = [{ name: "category", model: "Category" }];
  for (const ref of queryRefs) {
    if (ref["name"] in req.query) {
      query = await Recruitment.findByRef(
        ref["model"],
        ref["name"],
        query,
        req.query[ref["name"]]
      );
    }
  }

  if (req.query["name"]) {
    query["title"] = { $regex: req.query["name"], $options: "i" };
  }

  // Post.find(query)
  //   .populate("category")
  //   .populate({
  //     path: "comments",
  //     populate: {
  //       path: "owner",
  //       populate: {
  //         path: "profile",
  //       },
  //     },
  //   })
  //   .populate({
  //     path: "owner",
  //     populate: {
  //       path: "profile",
  //     },
  //   })
  //   .exec(function (err, docs) {
  //     if (err) return response.sendNotFound(res);
  //     res.json(docs);
  //   });
  Post.paginate(
    query,
    {
      limit: limit,
      page: page,
      populate: [
        { path: "category" },
        {
          path: "comments",
          populate: {
            path: "owner",
            populate: {
              path: "profile",
            },
          },
        },
        {
          path: "owner",
          populate: {
            path: "profile",
          },
        },
      ],
    },
    function (err, docs) {
      if (err) return response.sendNotFound(res);
      res.json(docs);
    }
  );
};
