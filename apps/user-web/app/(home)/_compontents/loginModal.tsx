import {Dialog} from "@/_components/ui/dialog";
import Login from "@/_components/ui/login";

const LoginModal = ({isLoginOpen ,setIsLoginOpen}) => {
  return(
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <Login/>
      </Dialog>
  );
}
export default LoginModal;
