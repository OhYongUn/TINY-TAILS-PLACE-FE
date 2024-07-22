import {Dialog} from "@/_components/ui/dialog";
import Login from "@/_components/ui/login";

const LoginModal = ({isLoginOpen ,setIsLoginOpen ,setIsSignUpOpen}) => {
  return(
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <Login setIsLoginOpen={setIsLoginOpen} setIsSignUpOpen={setIsSignUpOpen}/>
      </Dialog>
  );
}
export default LoginModal;
