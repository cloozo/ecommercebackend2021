const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product],
  })
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id)
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      res.status(500).json(err);
    });

  //
});

router.put("/:id", async (req, res) => {
  const categoryId = req.params.id;
  const result = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: categoryId,
      },
    }
  );
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const categoryId2 = req.params.id;
  const result2 = await Category.destroy(
    {
      where: {
        id: categoryId2,
      },
    }
  );
  res.json(result2);
});

module.exports = router;
