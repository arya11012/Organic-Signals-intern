import { Router } from "express";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { firestore, dealerAuth, sendGrid } from "../index.js"; // Assuming you have 'dealerAuth' for Firebase Authentication.

export const authRouter = Router();

authRouter.post("/dealer-signup", async (req, res) => {
  const { userDetails, companyDetails } = req.body;

  try {
    // Create a Firebase user with email and password
    const userCred = await createUserWithEmailAndPassword(
      dealerAuth,
      userDetails.email,
      userDetails.password
    );

    delete userDetails.password;
    userDetails.uid = userCred.user.uid;

    // Store user details in Firestore
    await firestore.collection("dealers").doc(userDetails.uid).set(userDetails);

    // Store company details as a subcollection of the dealer document
    await firestore
      .collection("dealers")
      .doc(userDetails.uid)
      .collection("companyDetails")
      .doc("companyDetails")
      .set(companyDetails);

    // Send a confirmation email or other notifications using SendGrid
    const message = {
      to: userDetails.email,
      from: {
        name: "Organic Signals",
        email: "techsup@organicsignals.co.in",
      },
      name: "Organic Signals",
      templateId: "d-a6c4c5e9aee243e2a88ad6f7e6204606",
      dynamicTemplateData: {
        name: userDetails.firstName,
        username: userDetails.username,
        password: userDetails.password,
      },
    };
    sendGrid.send(message);

    res.json({ message: "Dealer Created Successfully" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

authRouter.post("/dealer-signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in the dealer with email and password
    const userCredentials = await signInWithEmailAndPassword(
      dealerAuth,
      email,
      password
    );

    // Retrieve user details from Firestore
    const userDetails = await firestore
      .collection("dealers")
      .doc(userCredentials.user.uid)
      .get();

    res.json(userDetails.data());
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

authRouter.post("/dealer-forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Send a password reset email to the dealer's email address
    await sendPasswordResetEmail(dealerAuth, email);

    res.json({ message: "Password reset email sent" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

authRouter.post("/dealer-logout", async (req, res) => {
  try {
    // Sign out the currently authenticated dealer
    await signOut(dealerAuth);

    res.json({ message: "Dealer logout Successfully" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
