const Feedback = require("../../models/feedback.js");


handleAdminDashboard = async (req, res) => {
  try {
    const user = req.user;
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({
      admin: {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      },
      feedbacks,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


handleDeleteFeedback = async (req, res) => {
  const feedbackId = req.params.id;
  try {
    const feedback = await Feedback.findOne({ pageId: feedbackId });
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    await Feedback.deleteOne({ pageId: feedbackId });
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting feedback" });
  }
};


module.exports = {
  handleAdminDashboard,
    handleDeleteFeedback    
};