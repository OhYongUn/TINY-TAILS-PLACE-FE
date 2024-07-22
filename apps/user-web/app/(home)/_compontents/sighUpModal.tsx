import {Dialog} from "@/_components/ui/dialog";
import SighUp from "@/app/(home)/_compontents/sighUp";

const SighUpModal = ({isSighUpOpen,setIsSignUpOpen}) => {
  return(
      <Dialog open={isSighUpOpen} onOpenChange={setIsSignUpOpen}>
        <SighUp/>
      </Dialog>
  );
}
export default SighUpModal
