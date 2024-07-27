import {Input} from "@repo/ui";
import {Button} from "@repo/ui";

const LiveChatBox = () => {
  return (
      <div className="bg-muted border-l w-full md:w-80 flex flex-col order-1 md:order-2">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex items-start gap-3">
                  <img src="/placeholder.svg" width={40} height={40} alt="User Avatar"
                       className="rounded-full"/>
                  <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-muted-foreground">Hey, great stream!</div>
                  </div>
              </div>
              <div className="flex items-start gap-3">
                  <img src="/placeholder.svg" width={40} height={40} alt="User Avatar"
                       className="rounded-full"/>
                  <div>
                      <div className="font-medium">Jane Smith</div>
                      <div className="text-sm text-muted-foreground">Loving the content!</div>
                  </div>
              </div>
              <div className="flex items-start gap-3">
                  <img src="/placeholder.svg" width={40} height={40} alt="User Avatar"
                       className="rounded-full"/>
                  <div>
                      <div className="font-medium">Bob Johnson</div>
                      <div className="text-sm text-muted-foreground">Keep it up!</div>
                  </div>
              </div>
          </div>
          <div className="border-t p-4">
              <form className="flex gap-2">
                  <Input
                      type="text"
                      placeholder="Send a message..."
                      className="flex-1 bg-background rounded-md px-3 py-2 text-sm"
                  />
                  <Button type="submit" variant="outline">
                      Send
                  </Button>
              </form>
          </div>
      </div>
  )
}
export default LiveChatBox
