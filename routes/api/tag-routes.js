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
//post route
/* router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((newProductTag) => {
      res.json(newProductTag);
    })
    .catch((err) => {
      res.json(err);
    });
}); */
router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((tag) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            tag_id: tag.id,
            tag_id,
          };
        });
        return Tag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(tag);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", async (req, res) => {
  const TagId = req.params.id;
  const result = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: TagId,
      },
    }
  );
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const tagId = req.params.id;
  const result4 = await Tag.destroy({
    where: {
      id: tagId,
    },
  });
  res.json(result4);
});

module.exports = router;
