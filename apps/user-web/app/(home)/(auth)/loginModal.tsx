import {Dialog} from "@repo/ui/components/ui/dialog";
import Login from "./login";
import {ModalInterface} from "@app/common/compontes/interface";

const LoginModal = ({isLoginOpen ,setIsLoginOpen ,setIsSignUpOpen} :ModalInterface) => {
  return(
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <Login setIsLoginOpen={setIsLoginOpen} setIsSignUpOpen={setIsSignUpOpen}/>
      </Dialog>
  );
}
export default LoginModal;
