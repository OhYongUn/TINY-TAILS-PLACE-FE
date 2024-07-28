import {Dialog} from "@repo/ui/components/ui/dialog";
import SighUp from "./sighUp";

const SighUpModal = ({isSighUpOpen,setIsSignUpOpen}) => {
  return(
      <Dialog open={isSighUpOpen} onOpenChange={setIsSignUpOpen}>
        <SighUp/>
      </Dialog>
  );
}
export default SighUpModal
