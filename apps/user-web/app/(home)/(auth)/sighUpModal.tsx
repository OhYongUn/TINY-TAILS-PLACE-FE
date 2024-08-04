import {Dialog} from "@repo/ui/components/ui/dialog";
import SighUp from "./sighUp";
import {ModalInterface} from "@app/interface/compontes/interface";

const SighUpModal = ({isSignUpOpen, setIsSignUpOpen}: ModalInterface) => {
  return (
    <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
      <SighUp isSignUpOpen={isSignUpOpen} setIsSignUpOpen={setIsSignUpOpen}/>
    </Dialog>
  );
}
export default SighUpModal
