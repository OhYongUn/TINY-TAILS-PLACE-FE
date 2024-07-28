import {Dialog} from "@repo/ui/components/ui/dialog";
import Login from "./login";

const LoginModal = ({isLoginOpen ,setIsLoginOpen ,setIsSignUpOpen}) => {
    console.log('loginmodeal')
  return(
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <Login setIsLoginOpen={setIsLoginOpen} setIsSignUpOpen={setIsSignUpOpen}/>
      </Dialog>
  );
}
export default LoginModal;
