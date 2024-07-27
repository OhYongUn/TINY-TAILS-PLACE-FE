import {Dialog} from "@repo/ui";
import Login from "./login";

const LoginModal = ({isLoginOpen ,setIsLoginOpen ,setIsSignUpOpen}) => {
  return(
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <Login setIsLoginOpen={setIsLoginOpen} setIsSignUpOpen={setIsSignUpOpen}/>
      </Dialog>
  );
}
export default LoginModal;
