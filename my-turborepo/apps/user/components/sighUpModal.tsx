import {Dialog} from "@repo/ui";
import SighUp from "@user/components/sighUp";

const SighUpModal = ({isSighUpOpen,setIsSignUpOpen}) => {
  return(
      <Dialog open={isSighUpOpen} onOpenChange={setIsSignUpOpen}>
        <SighUp/>
      </Dialog>
  );
}
export default SighUpModal
