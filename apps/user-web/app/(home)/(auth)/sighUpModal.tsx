import {Dialog} from "@repo/ui/components/ui/dialog";
import SighUp from "./sighUp";
import {ModalInterface} from "@app/common/compontes/interface";

const SighUpModal = ({isSignUpOpen,setIsSignUpOpen} : ModalInterface) => {
  return(
      <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <SighUp/>
      </Dialog>
  );
}
export default SighUpModal
