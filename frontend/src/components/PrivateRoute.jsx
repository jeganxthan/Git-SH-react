import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

const PrivateRoute = ({ children }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

export default PrivateRoute;
