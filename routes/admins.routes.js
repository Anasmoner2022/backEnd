const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/admin.controller"),
  middleware = require("../middlewares/admin.middleware"),
  {
    authenticateAdminToken,
    authenticateUserToken,
  } = require("../middlewares/auth.middleware");

router.get("/", controller.index);
router.get("/email", middleware.getAdminByEmail, controller.show);
router.get("/:id", middleware.getAdminById, controller.show);

router.post("/addNewAdmin", controller.addNewAdmin);
router.post("/login", middleware.getAdminByEmail, controller.login);
// router.post("/signout", middleware.getAdminByEmail, controller.signout);

router.put(
  "/deleteAccount/:id",
  authenticateAdminToken,
  middleware.getAdminById,
  controller.deleteAccount
);

router.put(
  "/changePassword/:id",
  authenticateAdminToken,
  middleware.getAdminById,
  controller.changePassword
);

router.put(
  "/:id",
  authenticateAdminToken,
  middleware.getAdminById,
  middleware.upload.single("profileImage"),
  controller.updateData
);

module.exports = router;
