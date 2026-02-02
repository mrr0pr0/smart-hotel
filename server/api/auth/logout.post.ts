export default defineEventHandler(async (event) => {
  //TODO invalidate the session/token here
  return {
    success: true,
    message: "Logged out successfully",
  };
});
