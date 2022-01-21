const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
router.get("/", (req, res) => {
  // find all products
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tags) => {
      res.status(200).json(tags);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get one

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  console.log("test single ID");
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
